import { FC } from 'react';
import ImageService from '../../services/imageService';
import { WeatherInfo } from './Weather';
import { EventInfo } from './EventInfo';
import { useAppSelector } from '../../hooks/useAppSelector';
import { LocationInfo } from './Location';
import { makeStyles } from '@mui/styles';
import { ForecastList } from '../ForecastList';
import { Container, Stack } from '@material-ui/core';
import { Snack } from '../Snack';
import { ErrorIndicator } from '../ErrorIndicator';

const {setBackground} = ImageService

const useStyles = makeStyles({
	containerStyle: {
		'&.MuiContainer-root': {
			padding: 0,			
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			position: 'relative',
			maxWidth: '1600px',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between'
		}
		
	},
	infoContainerStyle: {
		padding: '64px',	
	},    
	eventAndTimeStyle: {
		width: '25rem'	
	},    
  })

const MainInfo: FC = () => {
	const { containerStyle, infoContainerStyle, eventAndTimeStyle } = useStyles()
	const { text } = useAppSelector(state => state.weather.hourlyForecast)[0]
	const { isError } = useAppSelector(state => state.weather.error)
	const background = setBackground(text)
	const content = isError ? <ErrorIndicator /> : (
		<Container
			classes={{ root: containerStyle }}
			sx={{ backgroundImage: `url(${background})`, }}>
			<div className={infoContainerStyle}>
				<Stack direction="row" justifyContent="space-between">
					<div className={eventAndTimeStyle}>
						<LocationInfo />
						<EventInfo />
					</div>
				<WeatherInfo />	
				</Stack>					
			</div>
			<Snack/>
			<ForecastList />
		</Container>)
	return (
		<>{content}</>)
}

export {MainInfo};
