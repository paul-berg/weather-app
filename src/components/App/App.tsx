import React from 'react';
import { Header } from '../wa-components/Header';
import { MainInfo } from '../wa-components/MainInfo';




import './App.css';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	containerStyle: {
    height: '100vh',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
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
