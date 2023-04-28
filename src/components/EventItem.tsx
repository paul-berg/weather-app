import React from "react";
import { UserEvent } from "../store/reducers/userSlice";
import { Typography, Container, Divider } from "@material-ui/core";
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
	containerStyle: {
		'&.MuiContainer-root': {
			padding: '0.2rem 0 0',
		}
	},
	dividerStyle: {
		'&.MuiDivider-root': {
			width: 'fit-content',
			marginLeft: '1.85rem',
			height: '1.8rem',
			borderColor: '#1976d2'

		},
		'&:last-of-type': {
			display: 'none'
		}
	},
	timeStyle: {
		'&.MuiTypography-root': {
			color: 'white',
			padding: '0.4rem 0.6rem',
			backgroundColor: '#1976d2',
			borderRadius: '1.2rem',
			marginRight: '1rem'
		}
	},
	summaryStyle: {
		'&.MuiTypography-root': {
			color: 'white',
		}
	},
})

const EventItem = ({ time, summary }: UserEvent) => {
	const { timeStyle, summaryStyle, containerStyle, dividerStyle } = useStyles()
	if (!time || !summary) return null
	return (
		<>
			<Container
				classes={{root: containerStyle}}
			>
				<Typography
					classes={{ root: timeStyle }}
					component='span'

				>
					{time} 
				</Typography>
				<Typography
					classes={{ root: summaryStyle }}
					component='span'
				>
					{summary} 
				</Typography>
			</Container>
			<Divider orientation='vertical'
				classes={{root: dividerStyle}}
			/>
		</>
		
	);
};

export {EventItem}