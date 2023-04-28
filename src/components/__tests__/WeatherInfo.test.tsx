import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { screen } from "@testing-library/react"
import { WeatherInfo } from "../wa-components/WeatherInfo";
import { initialHourlyForecast } from "./ForecastList.test";



const setup = () => {
	const utils = renderWithProviders(<WeatherInfo />, {
			preloadedState: {
			weather:{
				hourlyForecast: initialHourlyForecast,	
			} 
			}
	})
	const icon = screen.getByAltText('overcast')
	const description = screen.getByText('overcast')
	const temperature = screen.getByText(/25/)
	return {
		icon,
		description,
		temperature,
		...utils,
	}
}

describe('<WeatherInfo />', () => {
	it('renders correctly with store', () => {
		const {	icon, description, temperature} = setup()
		expect(icon).toBeInTheDocument()
		expect(description).toBeInTheDocument()
		expect(temperature).toBeInTheDocument()
	})

	it('does not render correctly without store', () => {
		renderWithProviders(<WeatherInfo />)
		expect(screen.queryByAltText('overcast')).toBeNull()
		expect(screen.queryByText('overcast')).toBeNull()
		expect(screen.queryByText(/25/)).toBeNull()
	})
	
})