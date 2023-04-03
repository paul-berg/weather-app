import React, { FC, useState } from 'react';
import { alpha, } from '@material-ui/core/styles';
import { makeStyles } from '@mui/styles';
import WeatherService from '../services/weatherService';
import { setLocation } from '../store/reducers/userSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setDailyForecast, setHourlyForecast, setError} from '../store/reducers/weatherSlice';
import { InputBase, Button } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
		
	searchStyle: {
		position: 'relative',
		display: 'flex',
		borderRadius: '5px',
		height: '1.9rem',
		marginLeft: '1rem',
		backgroundColor: alpha('#fff', 0.15),
	},
	searchButtonStyle: {
		"&.MuiButton-contained": {
			background: 'white',
			color: "#1976d2",
			'&:hover': {
				backgroundColor: 'rgb(216,216,216)',
			},
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderWidth: '0',
			borderRadius: '5px 0 0 5px',
		},
	},

	searchIconStyle: {
		padding: '0',
		margin: '0'
	},
	inputInputStyle: {
		paddingLeft: '1rem',
		display: 'relative',
		'&:hover': {
			backgroundColor: alpha('#fff', 0.25),
		},
		width: '15rem',
		borderRadius: '0 5px 5px 0',
	},
})

const SearchPanel: FC = () => {
	const classes = useStyles();
	const { city } = useAppSelector(state => state.user.location);
	// const {isError} = useAppSelector(state => state.weather.error);
	const dispatch = useAppDispatch()
	const { setForecasts } = WeatherService
	
	const [newCity, setNewCity] = useState<null | string>(null) 
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		newCity && newCity !== city &&
			setForecasts(newCity, dispatch, setDailyForecast, setHourlyForecast, setLocation, setError)		
	}	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {	
		setNewCity(e.target.value)
	}	

	return (
			<form					
			className={classes.searchStyle}
			onSubmit={handleSubmit}
		>
			<Button
				classes={{ root: classes.searchButtonStyle}}
				type='submit'
				id='submit'
				variant='contained'
				>
					<SearchIcon className={classes.searchIconStyle} />
				</Button>
      <InputBase
				placeholder="Enter your city…"
				defaultValue={city}
        classes={{
        root: classes.inputInputStyle,
        }}
				inputProps={{ 'aria-label': 'search' }}
				onChange={handleChange}
      />
		</form>	
	);
}

export {SearchPanel};
