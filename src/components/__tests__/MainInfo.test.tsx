import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { MainInfo } from "../wa-components/MainInfo";
import { initialLocation } from "./LocationInfo.test";
import { initialDailyForecast, initialHourlyForecast } from "./ForecastList.test";
import { initialEventList } from "./EventList.test";


const setup = (isErr: boolean, text: string ) => {
	const utils = renderWithProviders(<MainInfo />, {
		preloadedState: {
			user: {
				location: initialLocation,
				isAuthorized: true,
				events: initialEventList
			},
			weather:{
				dailyForecast: initialDailyForecast,
				hourlyForecast: [
					{date: '2023-06-22',
					time: '12:00',
					temp: 25,
					icon: "http//overcast.jpg",
					text: text,
					},
					...initialHourlyForecast
				],	
				isDailyForecast: true,
				error: {
					isError: isErr,
					msg: null,
				}
			} 
		}
	})
	return {
		...utils,
	}
}


describe('<MainInfo />', () => {
	it('renders correctly with store and without error', () => {
		const {getByText, queryByRole, queryByText} = setup(false, 'overcast')
		expect(getByText('23.03')).toBeInTheDocument()
		expect(queryByRole('progressbar')).toBeNull()
		expect(queryByText('Oops!')).toBeNull()
	})

	it('renders correctly with store and with error', () => {
		const {getByText, queryByText, queryByRole} = setup(true, 'overcast')
		expect(getByText('Oops!')).toBeInTheDocument()
		expect(queryByRole('progressbar')).toBeNull()
		expect(queryByText('23.03!')).toBeNull()
	})

	it('renders correctly without store and without error', () => {
		const { queryByText, getByRole } = setup(false, '')
		expect(getByRole('progressbar')).toBeInTheDocument()
		expect(queryByText('Oops!')).toBeNull()
		expect(queryByText('23.03!')).toBeNull()
	})
	
})