import { FC } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
	containerStyle: {
		width: '8rem',		
	},
	imageStyle: {
		margin: '-1.8rem 0 0',
		width: '100%',
		
	},
	textStyle: {
		'&.MuiTypography-root': {
			color: 'white',
			textAlign:'center'
		}
	},
})

const WeatherInfo: FC = () => {
	const { imageStyle, textStyle, containerStyle } = useStyles()
	const hourlyForecast = useAppSelector(state => state.weather.hourlyForecast)
	const text = hourlyForecast[0]?.text
	const icon = hourlyForecast[0]?.icon
	const temp = hourlyForecast[0]?.temp
	if (!icon || !text || !temp) return null
		const t = temp > 0 ? `+${temp}` : temp
	
		return (
			<div className={containerStyle}>
				<img src={icon} alt={text} className={imageStyle} />
				<Typography variant='body1' classes={{root: textStyle}}>
					{text}
				</Typography>		
				<Typography variant='h6' classes={{root: textStyle}}>
					{t}°C
				</Typography>		
			</div>
		);
	
}

export  {WeatherInfo};
