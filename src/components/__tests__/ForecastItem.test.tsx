import { screen } from "@testing-library/react";
import type { Forecast } from "../../store/reducers/weatherSlice";
import { ForecastItem } from "../ForecastItem";
import { renderWithProviders } from "../../utilsForTests/renderWithProviders";

const initialDailyForecast = {
	isDailyForecast: true
} 

const forecast: Forecast = {
  date: '2023-03-22',
  time: '13:00',
  temp: -5,
  icon: "http//snowy.jpg",
  text: "snow",
};

const { date, time, temp, icon, text } = forecast




describe('<ForecastItem />', () => {
  
	it('renders correctly with dailyForecast in store', () => {	
		renderWithProviders(<ForecastItem date={date} time={time} temp={temp} icon={icon} text={text}/>, {
			preloadedState: {
				weather: initialDailyForecast
			}
		})
		expect(screen.getByText('22.03')).toBeInTheDocument()
		expect(screen.getByAltText('snow')).toBeInTheDocument()
		expect(screen.getByText('-5°C')).toBeInTheDocument()
	})

	it.skip('renders correctly without hourlyForecast in store', () => {	
		renderWithProviders(<ForecastItem date={date} time={time} temp={temp} icon={icon} text={text}/>, {

		})
		expect(screen.getByText('13:00')).toBeInTheDocument()
		expect(screen.getByAltText(/weather icon/i)).toBeInTheDocument()
		expect(screen.getByText(/-5°C/)).toBeInTheDocument()
	})

})