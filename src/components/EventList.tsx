import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../hooks/useAppSelector';
import { UserEvent } from '../store/reducers/userSlice';
import { EventItem } from './EventItem';

const EventList: FC = () => {
	const isAuth = useAuth()
	const events = useAppSelector(state => state.user.events);	 
	return (
		<>
			{isAuth && (events.length !== 0) && events.map((event: UserEvent | undefined) => {
				if (event !== undefined) {
					return (
						<EventItem key={`${event.date}${event.time}`} {...event} />
					)
				} return undefined
			})}
			{isAuth && (events.length === 0) && <div>Your event list is empty for today</div>}
		</>
	);
}

export {EventList};
