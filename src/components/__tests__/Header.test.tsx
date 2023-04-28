import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { screen } from "@testing-library/react"
import { Header } from "../wa-components/Header";
import { mockNavigatorGeolocation } from "../../utilsForTests/mocks/mockNavigatorGeolocation";

const { getCurrentPositionMock } = mockNavigatorGeolocation();

export const initialLocation = {
	city: 'Bremen',
	country: 'Germany',
	dateTime: '2023-04-10 14:49',
	lat: '53.08',
	long: '8.8',
}

const setup = () => {
	const utils = renderWithProviders(<Header />, {
		preloadedState: {
			user: {
				location: initialLocation
			}
		}
	})
	const appName = screen.getByText('W App')
	const searchInput = screen.getByRole('textbox') as HTMLInputElement
	const hourlyButton = screen.getByText('hourly')
	const dailyButton = screen.getByText('daily')
	const progressbar = screen.queryByRole('progressbar')

	return {
		appName,
		searchInput,
		hourlyButton,
		dailyButton,
		progressbar,
		...utils,
	}
}

describe('<Header />', () => {
	it('renders correctly with store', () => {
		const {appName, searchInput, hourlyButton, dailyButton, progressbar} = setup()
		expect(appName).toBeInTheDocument()
		expect(searchInput).toBeInTheDocument()
		expect(hourlyButton).toBeInTheDocument()
		expect(dailyButton).toBeInTheDocument()
		expect(progressbar).toBeNull()
	})

	it('renders correctly without store', async () => {
		getCurrentPositionMock.mockImplementationOnce(
			(successCallback, rejected) => {
				successCallback({
					coords: {
						latitude: 37.7749,
						longitude: -122.4194
					}
				});
			}
		);
		renderWithProviders(<Header />)
		const searchField = await screen.findByRole('textbox') as HTMLInputElement
		expect(screen.getByText('W App')).toBeInTheDocument()
		expect(getCurrentPositionMock).toHaveBeenCalledTimes(1);
		expect(searchField).toBeInTheDocument() 
		expect(searchField.value).toBe('San Francisco')
		expect(screen.getByText('hourly')).toBeInTheDocument()
		expect(screen.getByText('daily')).toBeInTheDocument()
		expect(screen.queryByRole('progressbar')).toBeNull()
	})
	
})