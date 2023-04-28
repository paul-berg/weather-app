import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { fireEvent } from "@testing-library/react"
import { Authorization } from "../Authorization"
import CalendarService from "../../services/calendarService";
import { mockGapi } from "../../utilsForTests/mocks/mockGapi";
import { mockGoogleAccounts } from "../../utilsForTests/mocks/mockGoogleAccounts";

const { getTokenMock } = mockGapi();
mockGoogleAccounts()

const setup = (isAuthorized: boolean) => {
	const utils = renderWithProviders(<Authorization />, {
		preloadedState: {
			user: {
				isAuthorized
			}
		}
	})
	return {
		...utils
	}
}

describe('<Authorization />', () => {

	it('renders correctly with store', () => {
		const {getByRole} = setup(false)
		const logInButton = getByRole('button', { name: /signin/i })
		expect(logInButton).toBeInTheDocument()
	})

	it('works successfully', () => {
		const tokenConfig = {
			access_token: 'ya29.a0Ael9sCPKEn3qH01U1RkX-_NV94ghep4aKZ7T9wUmvNJ8-Mas5BonDhyrtxWT2X_SVq2s9D-jv746bDny1WA7XwF_dY-GcObtv0PdbyC9I6PhHz-gWHgNsL_jwjr9trEWyWeugucN8E-H8EIJ_ZyenvlG3lz3aCgYKAdESARESFQF4udJhs4Th-zZp0fP7LtAi6c__dQ0163',
			expires_in: 3600,
			token_type: 'Bearer',
			scope: 'https://www.googleapis.com/auth/calendar.readonly',
		}
		const handleClickAuthSpy = jest.spyOn(CalendarService, 'handleClickAuth')
		getTokenMock.mockImplementation(() => Promise.resolve(tokenConfig))
		const handleSignoutClickSpy = jest.spyOn(CalendarService, 'handleSignoutClick')
		const { getByRole } = setup(true)		
		const logOutButton = getByRole('button', { name: /signout/i })
		fireEvent.click(logOutButton)
		expect(handleSignoutClickSpy).toHaveBeenCalledTimes(1)
		const logInButton = getByRole('button', { name: /signin/i })
		fireEvent.click(logInButton)
		expect(handleClickAuthSpy).toHaveBeenCalledTimes(1)
	})

})