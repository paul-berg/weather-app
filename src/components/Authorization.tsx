import { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAuth } from '../hooks/useAuth';

import { setEvents, signIn, signOut, setSnackOpen } from '../store/reducers/userSlice';
import { makeStyles } from '@mui/styles';
import CalendarService from '../services/calendarService';


const {handleClickAuth, handleSignoutClick} = CalendarService

const useStyles = makeStyles({
		
	buttonStyle: {
		border: 'none',
		backgroundColor: 'rgb(0,0,0,0)',
		padding: '0',
		color: 'rgb(25,118,210)',
		'&:hover': {
			textDecoration: 'underline',
			cursor: 'pointer'
		},
		fontSize: '1rem',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',		
	},
	divStyle: {
		width: 'fit-content',
		fontSize: '1rem',
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		margin: '2rem 0 1rem',
		color: 'white'
	}
})

const Authorization: FC = () => {
	const {buttonStyle, divStyle} = useStyles()
	const isAuth = useAuth()	
	const dispatch = useAppDispatch()
	const handleSignIn = () => {
		handleClickAuth(dispatch, setEvents, signIn, setSnackOpen)
	}
	const handleSignOut = () => {
		handleSignoutClick()
		dispatch(signOut())
		dispatch(setSnackOpen(true))
	}

	const content = isAuth ?
		(<div className={divStyle}>To sign out press <button className={buttonStyle} onClick={handleSignOut}>here</button></div>) :
		(<div className={divStyle}>To show event list you need to <button className={buttonStyle}  onClick={handleSignIn}>sign in</button></div> )
	return (
		<div >
			{content}
		</div>
	);
}

export {Authorization};
