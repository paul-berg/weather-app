import { FC } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAppSelector } from '../hooks/useAppSelector';
import { UserEvent } from '../store/reducers/userSlice';
import { EventItem } from './EventItem';

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
	divStyle: {
		width: 'fit-content',
		fontSize: '1rem',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		margin: '2rem 0 1rem',
		color: 'white'
	}
})

const EventList: FC = () => {
	const {divStyle} = useStyles()
	const isAuth = useAuth()
	const events = useAppSelector(state => state.user.events);	 
	if (!isAuth) return null
	return (
		<>
			{isAuth && (events.length !== 0) && events.map((event: UserEvent | undefined) => {
				if (event !== undefined) {
					return (
						<EventItem key={`${event.date}${event.time}`} {...event} />
					)
				} return undefined
			})}
			{isAuth && (events.length === 0) && <div className={divStyle}>Your event list is empty for today</div>}
		</>
	);
}

export {EventList};
