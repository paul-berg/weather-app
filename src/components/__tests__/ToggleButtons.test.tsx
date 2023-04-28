import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { fireEvent } from "@testing-library/react"
import { ToggleButtons } from "../ToggleButtons"
import * as actions from "../../store/reducers/weatherSlice";



const setup = (isDailyForecast: boolean) => {
	const utils = renderWithProviders(<ToggleButtons />, {
			preloadedState: {
				weather:{
					isDailyForecast
				} 
			}
	})
	return {
		...utils,
	}
}

describe('<ToggleButtons />', () => {
	it('renders correctly', () => {
		const { getByText } = setup(true)
		const dailyButton = getByText('daily')
		const hourlyButton = getByText('hourly')
		expect(dailyButton).toBeInTheDocument()
		expect(hourlyButton).toBeInTheDocument()
	})

	it('renders and works correctly with active daily forecast', async () => {
		const switchForecastTypeSpy = jest.spyOn(actions, 'switchForecastType')

		const { getByText } = setup(true)
		const dailyButton = getByText('daily') as HTMLButtonElement
		const hourlyButton = getByText('hourly') as HTMLButtonElement
		expect(dailyButton).toBeInTheDocument()
		expect(hourlyButton).toBeInTheDocument()
		expect(dailyButton.disabled).toBe(true)
		expect(hourlyButton.disabled).toBe(false)
		fireEvent.click(hourlyButton)
		expect(switchForecastTypeSpy).toHaveBeenCalledTimes(1)
		expect(dailyButton.disabled).toBe(false)
		expect(hourlyButton.disabled).toBe(true)
		fireEvent.click(dailyButton)
		expect(switchForecastTypeSpy).toHaveBeenCalledTimes(2)
		expect(dailyButton.disabled).toBe(true)
		expect(hourlyButton.disabled).toBe(false)
	})

	it('renders correctly with active hourly forecast', () => {
		const { getByText } = setup(false)
		const dailyButton = getByText('daily') as HTMLButtonElement
		const hourlyButton = getByText('hourly') as HTMLButtonElement
		expect(dailyButton).toBeInTheDocument()
		expect(hourlyButton).toBeInTheDocument()
		expect(dailyButton.disabled).toBe(false)
		expect(hourlyButton.disabled).toBe(true)
	})


})