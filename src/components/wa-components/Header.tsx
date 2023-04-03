import  { FC, useEffect,} from 'react';
import { Theme } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@mui/styles';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import WeatherService from '../../services/weatherService';
import { setLocation } from '../../store/reducers/userSlice';
import { SwitchButtons } from '../ToggleButtons';
import { setDailyForecast, setHourlyForecast,setError } from '../../store/reducers/weatherSlice';
import {AppBar, Toolbar, Typography, Stack } from '@material-ui/core';
import { SearchPanel } from '../SearchPanel';
import { useCoordinates } from '../../hooks/useCoordinates';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   menuStyle: {
      '&.MuiToolbar-root': {
       maxWidth: '1600px',
       padding: '0 1rem',
       width: 'calc(100% - 2rem)',
       display: 'flex',
       justifyContent: 'space-between',
       margin: '0 auto',       
      },
  }  
  }) 
);

const Header: FC = () => {
  const {menuStyle} = useStyles();
  const coords = useCoordinates()
  const { setForecasts } = WeatherService
  const {city, country, lat, long, dateTime} = useAppSelector(state => state.user.location);
  const dispatch = useAppDispatch()

  const currentDate = new Date().toISOString().slice(0,10) 
  useEffect(() => {
    console.log(coords);    
    ((!city && !country && !lat && !long && !dateTime) ||
      (dateTime && currentDate !== dateTime.slice(0, 10))) &&
      coords &&
      setForecasts([coords.latitude, coords.longitude], dispatch, setDailyForecast, setHourlyForecast, setLocation, setError)      
  }, [coords])
 
  return (
    <AppBar position='relative'>
      <Toolbar classes={{ root: menuStyle }}>
        <Stack direction="row" >
          <Typography
            variant='h5'
            component='span'
          >
            W App
          </Typography>
          <SearchPanel />
        </Stack>
         <SwitchButtons />
      </Toolbar>        
    </AppBar>
	);
}

export {Header};



