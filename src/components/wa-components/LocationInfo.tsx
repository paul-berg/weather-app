import React, {FC} from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { useAppSelector } from '../../hooks/useAppSelector';


const useStyles = makeStyles({
	containerStyle: {
		'&.MuiTypography-root': {
			color: 'white',
		}
	},
	
})

const LocationInfo: FC = () => {
	const { containerStyle } = useStyles()	
	const { city, country, dateTime } = useAppSelector(state => state.user.location);
	
	if (!city || !country || !dateTime) return null

	const date = new Date(`${dateTime}`)
	const timeFull = Intl.DateTimeFormat('en-US', {
		hour: "numeric",
		minute: "numeric",
	}).format(date)
	const dateFull = Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)
	const time = timeFull.length < 8 ? `0${timeFull.slice(0,4)}` : timeFull.slice(0,5)
	const dayPart = timeFull.length < 8 ? timeFull.slice(4) : timeFull.slice(5)
	return (
		<>
			<div >
				<Typography
					classes={{root: containerStyle}}
          variant='h2'
          component='span'
      >
          {time}
			</Typography>
			<Typography
			classes={{root: containerStyle}}
					variant='subtitle1'					
          component='span'
      >
          {dayPart}
			</Typography>				
			</div>
			<Typography
          variant='body1'
          classes={{root: containerStyle}}
      >
          {dateFull}
			</Typography>	
			<Typography
          variant='body1'
          classes={{root: containerStyle}}
      >
          {`${city}, ${country}`}
			</Typography>	
		</>
	);

	
}

export {LocationInfo};
