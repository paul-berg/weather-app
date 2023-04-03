import {FC, useState} from "react";
import { Alert, Snackbar } from "@material-ui/core";
import { useAuth } from "../hooks/useAuth";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSnackOpen } from '../store/reducers/userSlice';

const Snack: FC = () => {
	const dispatch = useAppDispatch()
	const isSnackOpen = useAppSelector(state => state.user.isSnackOpen);
	// console.log(isSnackOpen);
	const isAuth = useAuth()
	const endMessage: string = isAuth ? 'in' : 'out'

	const handleClose = () => {
		dispatch(setSnackOpen(false))		
	}

	return (
		<Snackbar
			open={isSnackOpen}
			onClose={handleClose}
			autoHideDuration={3000}
		>
			<Alert
				severity='success'
			>
				{`You have successfully logged ${endMessage}!`}
			</Alert>
		</Snackbar>
	)
}

export {Snack}