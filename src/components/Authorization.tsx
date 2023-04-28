import { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAuth } from '../hooks/useAuth';
import { setEvents, signIn, signOut, setSnackOpen } from '../store/reducers/userSlice';
import { makeStyles } from '@mui/styles';
import CalendarService from '../services/calendarService';


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
	const { handleClickAuth, handleSignoutClick } = CalendarService

	const {buttonStyle, divStyle} = useStyles()
	let isAuth = useAuth()	
	const dispatch = useAppDispatch()
	const handleSignIn = () => {	
		handleClickAuth(dispatch, setEvents, signIn, setSnackOpen)
	}
	const handleSignOut = () => {
		handleSignoutClick()
		dispatch(signOut())
		dispatch(setSnackOpen(true))
	}
	if (document.cookie.indexOf('googleAccessToken=') !== -1) {
		const tokenConfig = {
			access_token: 'ya29.a0Ael9sCPKEn3qH01U1RkX-_NV94ghep4aKZ7T9wUmvNJ8-Mas5BonDhyrtxWT2X_SVq2s9D-jv746bDny1WA7XwF_dY-GcObtv0PdbyC9I6PhHz-gWHgNsL_jwjr9trEWyWeugucN8E-H8EIJ_ZyenvlG3lz3aCgYKAdESARESFQF4udJhs4Th-zZp0fP7LtAi6c__dQ0163',
			expires_in: 3600,
			token_type: 'Bearer',
			scope: 'https://www.googleapis.com/auth/calendar.readonly',
		}
		gapi.client.setToken(tokenConfig)
		isAuth = true
	}
	const content = isAuth ?
		(<div className={divStyle}>To sign out press <button aria-label='signOut' className={buttonStyle} onClick={handleSignOut}>here</button></div>) :
		(<div className={divStyle}>To show event list you need to <button aria-label='signIn' className={buttonStyle}  onClick={handleSignIn}>sign in</button></div> )
	return (
		<div >
			{content}
		</div>
	);
}

export {Authorization};
