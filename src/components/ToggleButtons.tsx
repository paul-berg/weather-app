import { FC, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/core';
import { switchForecastType } from '../store/reducers/weatherSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';


const useStyles = makeStyles({

	b: {
		"&.MuiToggleButton-root": {
			padding: '0.32rem 0.64rem',
			background: 'white',
			color: "#1976d2",
			'&:hover': {
				backgroundColor: 'rgb(216,216,216)',
			},
			'&.Mui-selected': {
				backgroundColor: 'rgb(140,186,232)',
				color: '#1976d2'
			},
		},

	},
})

const buttonValues: string[] = ['daily','hourly'] 

const SwitchButtons: FC = () => {	
	const classes = useStyles();

	const isDailyForecast = useAppSelector(state => state.weather.isDailyForecast)
	const primaryValue = isDailyForecast ? 'daily' : 'hourly'	
	const [forecastType, setForecastType] = useState<string>(primaryValue);

  const dispatch = useAppDispatch()

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
		newForecastType: string,
	) => {
		setForecastType(newForecastType);
		dispatch(switchForecastType())
	};

	return (
		<ToggleButtonGroup
			value={forecastType}
			exclusive
			onChange={handleChange}
			// aria-label="Platform"
		>
			{buttonValues && buttonValues.map(value => {
				return (
					<ToggleButton
						key={value}
						value={value} 
						disabled={value === forecastType}
						classes={{ root: classes.b }}
						children={value}
					/>
				)
			})}
		</ToggleButtonGroup>
	)
}

export {SwitchButtons};
