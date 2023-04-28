import { FC } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { ForecastItem } from './ForecastItem';
import { Forecast} from '../store/reducers/weatherSlice';
import { Stack } from '@material-ui/core';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
	ulStyle: {
		backgroundColor: 'rgba(25,118,210,0.6)',
		margin: '0',
		padding: '1rem 1.5rem'
	},
})


const ForecastList: FC = () => {
	const {ulStyle} = useStyles()

	const dailyForecast = useAppSelector(state => state.weather.dailyForecast)
	const hourlyForecast = useAppSelector(state => state.weather.hourlyForecast)
	const isDailyForecast = useAppSelector(state => state.weather.isDailyForecast)
	const forecast = isDailyForecast ? dailyForecast : hourlyForecast.slice(1)		

	return (		
		<ul className={ulStyle}>
			<Stack direction="row"
				justifyContent="space-around"
				alignItems="center">
			{forecast && forecast.map((item: Forecast) => {
				return (
					<ForecastItem key={`${item.date}${item.time}`} {...item} />
				)
			})}
			</Stack>
		</ul>
	);
}

export {ForecastList};
