import { Forecast } from '../store/reducers/weatherSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { makeStyles } from '@mui/styles';
import {Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	liStyle: {
		listStyle: 'none',

	},
	cardStyle: {
		"&.MuiCard-root": {
			boxShadow: 'none',
			backgroundColor: 'rgba(0,0,0,0)',
			color: 'white',
			textAlign: 'center',
			
		}
	}  
})

const ForecastItem = ({ date, time, temp, icon, text }: Forecast) => {
	const {liStyle, cardStyle} = useStyles()

	const isDailyForecast = useAppSelector(state => state.weather.isDailyForecast)
	const dateTime = isDailyForecast ? date.slice(5).split('-').reverse().join('.') : time
	const t = temp > 0 ? `+${temp}` : temp
	return (
		<li className={liStyle}>
			<Card classes={{root: cardStyle}}>
				<CardHeader title={dateTime}/>
				<CardMedia					
      	  component="img"
					width="80%"					
      	  image={icon}
      	  alt={text}
      	/>
				<CardContent>
					<Typography variant='h6'>
						{t}°C
					</Typography>
				</CardContent>
			</Card>
		</li>
	);
}

export {ForecastItem};
