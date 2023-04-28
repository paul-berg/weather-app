import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { EventList } from "../EventList"

import { UserEvent } from "../../store/reducers/userSlice";

export const initialEventList: Array<UserEvent> = [
	{date: '2023-04-10',
		time: '13:00',
		summary: 'Make a note'},
	{date: '2023-04-10',
		time: '14:00',
		summary: 'Make an exercise'},
]

const setup = (isAuth: boolean) => {
	const utils = renderWithProviders(<EventList />, {
			preloadedState: {
			user: {
					isAuthorized: isAuth,
					events: initialEventList
				}
			}
	})
	return {
		...utils,
	}
}

describe('<EventList />', () => {
	it('renders correctly with store and with auth', () => {
		const { getByText } = setup(true)
		expect(getByText('13:00')).toBeInTheDocument()
		expect(getByText('Make a note')).toBeInTheDocument()
		expect(getByText('14:00')).toBeInTheDocument()
		expect(getByText('Make an exercise')).toBeInTheDocument()
	})

	it('renders correctly with store and without auth', () => {
		const {queryByText} = setup(false)
		expect(queryByText('13:00')).toBeNull()
		expect(queryByText('Make a note')).toBeNull()
		expect(queryByText('14:00')).toBeNull()
		expect(queryByText('Make an exercise')).toBeNull()
	})
	
})