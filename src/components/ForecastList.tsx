import React, { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { RootState } from '../store/store';
import { ForecastItem } from './ForecastItem';
import { Forecast, setDailyForecast } from '../store/reducers/weatherSlice';
import { alpha } from '@mui/material';
import { Stack } from '@material-ui/core';
// import { setDailyForecast } from '../store/weatherSlice';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
	ul: {
		backgroundColor: 'rgba(25,118,210,0.6)',
		margin: '0',
		padding: '1rem 1.5rem'
	},
	grouped: {
		"&.MuiButton-contained": {
			background: 'white',
			color: "#1976d2",
		},

	},
})


const ForecastList: FC = () => {
	const {ul} = useStyles()

	const dailyForecast = useAppSelector(state => state.weather.dailyForecast)
	const hourlyForecast = useAppSelector(state => state.weather.hourlyForecast)
	const isDailyForecast = useAppSelector(state => state.weather.isDailyForecast)
	const forecast = isDailyForecast ? dailyForecast : hourlyForecast.slice(1)		

	return (		
		<ul className={ul}>
			<Stack direction="row"
				justifyContent="space-around"
				alignItems="center">
			{forecast && forecast.map(item => {
				return (
					<ForecastItem key={`${item.date}${item.time}`} {...item} />
				)
			})}
			</Stack>
		</ul>
	);
}

export {ForecastList};
