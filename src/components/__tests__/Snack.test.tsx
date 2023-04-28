import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { Snack } from "../Snack"

const setup = (isAuth: boolean, isSnackOpen: boolean) => {
	const utils = renderWithProviders(<Snack />, {
			preloadedState: {
				user: {
						isAuthorized: isAuth,
						isSnackOpen: isSnackOpen
				}
			}
	})
	return {
		...utils,
	}
}

describe('<Snack />', () => {
	it('renders correctly with visibility if auth', () => {
		const { getByText } = setup(true, true)
		expect(getByText('You have successfully logged in!')).toBeInTheDocument()
	})

	it('renders correctly with visibility if not auth', () => {
		const { getByText } = setup(false, true)
		expect(getByText('You have successfully logged out!')).toBeInTheDocument()
	})

	it('does not render without visibility', () => {
		const { queryByText } = setup(false, false)
		expect(queryByText('You have successfully logged out!')).toBeNull()
	})

})