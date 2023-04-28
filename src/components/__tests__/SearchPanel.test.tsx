import { fireEvent, screen } from "@testing-library/react"
import { SearchPanel } from "../SearchPanel"
import { renderWithProviders } from "../../utilsForTests/renderWithProviders"
import WeatherService from "../../services/weatherService"


const initialLocation = {
		city: 'Bremen',
}

const setup = () => {
	const utils = renderWithProviders(<SearchPanel />, {
		preloadedState: {
			user: {
				location: initialLocation
			}
		}
	})
	const input = screen.getByRole('textbox') as HTMLInputElement
	const submitButton = screen.getByRole('button')
	const progressbar = screen.queryByRole('progressbar')

	return {
		input,
		progressbar,
		submitButton,
		...utils,
	}
}

const setForecastsSpy = jest.spyOn(WeatherService, 'setForecasts')

describe('<SearchPanel />', () => {

	it('renders correctly without store', () => {
		renderWithProviders(<SearchPanel />)
		expect(screen.getByRole('progressbar')).toBeInTheDocument()
		expect(screen.queryByRole('textbox')).toBeNull()
		expect(screen.queryByRole('button')).toBeNull()
	})

	it('renders correctly with store', () => {	
		const {input, submitButton, progressbar} = setup()
		expect(input).toBeInTheDocument()
		expect(submitButton).toBeInTheDocument()
		expect(progressbar).toBeNull()
	})

	it('runs handleChange', () => {
		const {input} = setup()
		expect(input.value).toBe('Bremen')
		fireEvent.change(input, { target: { value: 'Brest' } })
		expect(input.value).toBe('Brest')
	})

	it('submits form', () => {
		const {input, submitButton} = setup()
		fireEvent.change(input, { target: { value: 'Brest' } })
		fireEvent.click(submitButton)
		expect(setForecastsSpy).toHaveBeenCalledTimes(1)
	})

	it('does not submit empty form', () => {
		const {input, submitButton} = setup()
		fireEvent.change(input, { target: { value: '' } })
		fireEvent.click(submitButton)
		expect(setForecastsSpy).toHaveBeenCalledTimes(0)
	})	
})