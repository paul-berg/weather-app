import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { fireEvent, screen } from "@testing-library/react"
import { ErrorIndicator } from "../ErrorIndicator"

const initialError = {
		isError: true,
		msg: 'No matching location found',
}

const setup = () => {
	const utils = renderWithProviders(<ErrorIndicator />, {
		preloadedState: {
			weather: {
				error: initialError
			}
		}
	})
	const alertMessage = screen.getByText('Oops!')
	const errorMessage = screen.getByTestId('message')
	const button = screen.getByRole('button')
	
	return {
		alertMessage,
		errorMessage,
		button,
		...utils,
	}
}

describe('<ErrorIndicator />', () => {
	it('renders correctly with store', () => {
		const { alertMessage, errorMessage, button } = setup()
		expect(alertMessage).toBeInTheDocument()
		expect(errorMessage).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('closes after pressing the button', () => {
		const { button } = setup()
		fireEvent.click(button)
		expect(screen.queryByText('Oops!')).toBeNull()
		expect(screen.queryByTestId('message')).toBeNull()
		expect(screen.queryByRole('button')).toBeNull()
	})
		
})