import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Forecast {
	date: string;
	time: string;
	temp: number;
	icon: string;
	text: string
}

export interface Err {
	isError: boolean,
	msg: null | string
}

export interface WeatherState {
	dailyForecast: Array<Forecast>;
	hourlyForecast: Array<Forecast>;
	isDailyForecast: boolean;
	loading: boolean;
	error: Err;
}



const initialState: WeatherState = {
	dailyForecast: [],
	hourlyForecast: [],	
	isDailyForecast: true,
	loading: false,
	error: {
		isError: false,
		msg: null
	}
}

export const weatherSlice = createSlice({
	name: 'weather',
	initialState: initialState,
	reducers: {
		switchForecastType(state) {
			state.isDailyForecast = !state.isDailyForecast
		},
		setDailyForecast(state, action: PayloadAction<Array<Forecast>>) {
			state.dailyForecast = action.payload
		},
		setHourlyForecast(state, action: PayloadAction<Array<Forecast>>) {
			state.hourlyForecast = action.payload
		},
		setError(state, action: PayloadAction<Err>) {
			state.error = action.payload
		},
	}
})



export const { switchForecastType, setDailyForecast, setHourlyForecast, setError, } = weatherSlice.actions

export type SetDailyForecast = ReturnType<typeof setDailyForecast>
export type SetHourlyForecast = ReturnType<typeof setHourlyForecast>
export type SetError = ReturnType<typeof setError>

export default weatherSlice.reducer