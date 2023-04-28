import { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { setError } from '../store/reducers/weatherSlice';
import { Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
	containerStyle: {
		'&.MuiContainer-root': {
			margin: '9rem auto',
			textAlign: 'center'
		}
	},
	attractorStyle: {
		'&.MuiTypography-root': {
			fontWeight: '800',
			color: 'rgb(40,40,40)'
		}
	},
	infoStyle: {
		'&.MuiTypography-root': {
			margin: '3rem 0 1rem',
			fontWeight: '600',
			color: 'rgb(80,80,80)'
		}
	}
})

const ErrorIndicator: FC = () => {
	const { containerStyle, attractorStyle, infoStyle } = useStyles()
	const dispatch = useAppDispatch()
	const { isError, msg: message } = useAppSelector(state => state.weather.error)
	if (!isError) return null

	return (
		<Container classes={{root: containerStyle}}>
			<Typography variant="h1"
				classes={{ root: attractorStyle }}
			>
				Oops!
			</Typography>
			<Typography variant="h5"
				data-testid="message"
				classes={{ root: infoStyle }}
			>
				{message}. That is all we know.
			</Typography>
			<Button
				variant="contained"
				onClick={() => dispatch(setError({ isError: false, msg: null }))}
			>
				Get me out of here
			</Button>
		</Container>
	);
}

export {ErrorIndicator};
