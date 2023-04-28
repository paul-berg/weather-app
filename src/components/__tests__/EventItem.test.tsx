import { renderWithProviders } from "../../utilsForTests/renderWithProviders";
import { screen } from "@testing-library/react"
import { EventItem } from "../EventItem"

import { UserEvent } from "../../store/reducers/userSlice";

const userEvent: UserEvent = {
		date: '2023-04-10',
		time: '13:00',
		summary: 'Make a note',
}
const {date, time, summary}= userEvent

const setup = () => {
	const utils = renderWithProviders(<EventItem date={date} time={time} summary={summary}/>)
	const eventTime = screen.getByText('13:00')
	const eventSummary = screen.getByText('Make a note')
	
	return {
		eventTime,
		eventSummary,
		...utils,
	}
}

describe('<EventItem />', () => {
	it('renders correctly with props', () => {
		const { eventTime, eventSummary } = setup()
		expect(eventTime).toBeInTheDocument()
		expect(eventSummary).toBeInTheDocument()
	})	
})