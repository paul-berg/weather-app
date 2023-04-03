import { FC } from 'react';
import { EventList } from '../EventList';
import { Authorization } from '../Authorization';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	containerStyle: {
		height: '15rem',
		// background: 'red'
	},
})

const EventInfo: FC = () => {
	const {containerStyle} = useStyles()
	return (
		<div className={containerStyle}>
			<Authorization />
			<EventList />
		</div>
	);
}

export  {EventInfo};
