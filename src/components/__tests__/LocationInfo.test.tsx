import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { screen } from "@testing-library/react"
import { LocationInfo } from "../wa-components/LocationInfo";

export const initialLocation = {
		city: 'Bremen',
		country: 'Germany',
		dateTime: '2023-04-10 14:49',
}

const setup = () => {
	const utils = renderWithProviders(<LocationInfo />, {
		preloadedState: {
			user: {
				location: initialLocation
			}
		}
	})
	const time = screen.getByText('02:49')
	const dayPart = screen.getByText('PM')
	const date = screen.getByText('Monday, April 10, 2023')
	const location = screen.getByText('Bremen, Germany')

	return {
		time,
		dayPart,
		date,
		location,
		...utils,
	}
}

describe('<LocationInfo />', () => {
	it('renders correctly with location', () => {
		const { time, dayPart, date, location } = setup()
		expect(time).toBeInTheDocument()
		expect(dayPart).toBeInTheDocument()
		expect(date).toBeInTheDocument()
		expect(location).toBeInTheDocument()
	})

	it('does not render without location', () => {
		renderWithProviders(<LocationInfo />)
		expect(screen.queryByText('02:49')).toBeNull()
		expect(screen.queryByText('PM')).toBeNull()
		expect(screen.queryByText('Monday, April 10, 2023')).toBeNull()
		expect(screen.queryByText('Bremen, Germany')).toBeNull()
	})
	
})