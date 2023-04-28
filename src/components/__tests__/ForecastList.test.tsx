import type { Forecast } from "../../store/reducers/weatherSlice";
import { ForecastList } from "../ForecastList";
import { renderWithProviders } from "../../utilsForTests/renderWithProviders";


export const initialDailyForecast: Array<Forecast> = [
	{date: '2023-03-22',
  time: '00:00',
  temp: -5,
  icon: "http//snowy.jpg",
  text: "snow",
	},
	{date: '2023-03-23',
  time: '00:00',
  temp: -6,
  icon: "http//blizzard.jpg",
  text: "blizzard",
	},
	{
		date: '2023-03-24',
  time: '00:00',
  temp: -7,
  icon: "http//icyPellets.jpg",
  text: "icy pellets",
	},
];

export const initialHourlyForecast: Array<Forecast> = [
	{date: '2023-06-22',
  time: '13:00',
  temp: 25,
  icon: "http//overcast.jpg",
  text: "overcast",
	},
	{date: '2023-06-22',
  time: '14:00',
  temp: 26,
  icon: "http//partlyCloudy.jpg",
  text: "partly cloudy",
	},
	{date: '2023-06-22',
  time: '15:00',
  temp: 27,
  icon: "http//sunny.jpg",
  text: "sunny",
	},
];

const setup = (isDailyForecast: boolean) => {
	const utils = renderWithProviders(<ForecastList />, {
			preloadedState: {
			weather:{
				dailyForecast: initialDailyForecast,
				hourlyForecast: initialHourlyForecast,	
				isDailyForecast
			} 
			}
	})
	return {
		...utils,
	}
}



describe('<ForecastList />', () => {
	it('renders correctly without store and daily forecast', () => {
		const { getByText, getByAltText, queryByText, queryByAltText } = setup(true)
		expect(getByText('22.03')).toBeInTheDocument()
		expect(getByText('23.03')).toBeInTheDocument()
		expect(getByText('24.03')).toBeInTheDocument()
		expect(getByAltText('snow')).toBeInTheDocument()
		expect(getByAltText('blizzard')).toBeInTheDocument()
		expect(getByAltText('icy pellets')).toBeInTheDocument()
		expect(getByText('-5°C')).toBeInTheDocument()
		expect(getByText('-6°C')).toBeInTheDocument()
		expect(getByText('-7°C')).toBeInTheDocument()

		expect(queryByText('13:00')).toBeNull()
		expect(queryByText('14:00')).toBeNull()
		expect(queryByText('15:00')).toBeNull()
		expect(queryByAltText('overcast')).toBeNull()
		expect(queryByAltText('partly cloudy')).toBeNull()
		expect(queryByAltText('sunny')).toBeNull()
		expect(queryByText('+25°C')).toBeNull()
		expect(queryByText('+26°C')).toBeNull()
		expect(queryByText('+27°C')).toBeNull()
	})

	it('renders correctly without store and hourly forecast', () => {
		const { getByText, getByAltText, queryByText, queryByAltText } = setup(false)

		expect(getByText('14:00')).toBeInTheDocument()
		expect(getByText('15:00')).toBeInTheDocument()
		expect(getByAltText('partly cloudy')).toBeInTheDocument()
		expect(getByAltText('sunny')).toBeInTheDocument()
		expect(getByText('+26°C')).toBeInTheDocument()
		expect(getByText('+27°C')).toBeInTheDocument()

		expect(queryByText('13:00')).toBeNull()
		expect(queryByText('22.03')).toBeNull()
		expect(queryByText('23.03')).toBeNull()
		expect(queryByText('24.03')).toBeNull()
		expect(queryByAltText('overcast')).toBeNull()
		expect(queryByAltText('snow')).toBeNull()
		expect(queryByAltText('blizzard')).toBeNull()
		expect(queryByAltText('icy pellets')).toBeNull()
		expect(queryByText('+25°C')).toBeNull()
		expect(queryByText('-5°C')).toBeNull()
		expect(queryByText('-6°C')).toBeNull()
		expect(queryByText('-7°C')).toBeNull()
	})
	
})
