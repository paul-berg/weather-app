import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface DateTime {
	date: string | null;
	time: string | null;
}

export interface UserEvent extends DateTime {	
	summary: string
}

export interface Location {
	city: string | null;
	country: string | null;
	long: number | null;
	lat: number | null;
	dateTime: string | null;
}

export interface UserState {
	isAuthorized: boolean;
	events: Array<UserEvent | undefined> ;
	location: Location;
	isSnackOpen: boolean;
}

const initialState: UserState = {
	isAuthorized: false,
	events: [],	
	location: {
		city: null,
		country: null,
		long: null,
		lat: null,
		dateTime: null,
	},
	isSnackOpen: false

}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		signIn(state) {
			state.isAuthorized = true
		},
		signOut(state) {
			state.isAuthorized = false
		},
		setEvents(state, action: PayloadAction<Array<UserEvent | undefined>>) {
			state.events = action.payload
		},
		setLocation(state, action: PayloadAction<Location>) {
			state.location = action.payload
		},
		setCoords(state, action: PayloadAction<Array<number>>) {
			state.location.long = action.payload[0]
			state.location.lat = action.payload[1]
		},
		setSnackOpen(state, action: PayloadAction<boolean>) {
			state.isSnackOpen = action.payload 
		},
	}
})

export const { signIn, signOut, setEvents, setCoords, setLocation, setSnackOpen } = userSlice.actions

export default userSlice.reducer