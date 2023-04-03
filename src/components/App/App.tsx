import React from 'react';
import { WeatherState } from '../../store/reducers/weatherSlice';
import { RootState } from '../../store/store';
// import ForecastPage
import { Header } from '../wa-components/Header';
import { MainInfo } from '../wa-components/MainInfo';
import { useSelector } from 'react-redux';
// import { switchForecastType, setDailyForecast, setHourlyForecast } from '../store/weatherSlice';


import './App.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	containerStyle: {
    height: '100vh',
    margin: '0 auto'
	},
	
})


const App = () => {
  const {containerStyle} = useStyles()
  return (
    <div className={containerStyle}>
      <Header />
      <MainInfo />
    </div>
  );
}

export {App};
