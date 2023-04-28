import { Forecast } from "../store/reducers/weatherSlice"
import { Location } from "../store/reducers/userSlice"
import { Action, Dispatch } from 'redux';			
import { Err } from "../store/reducers/weatherSlice";


interface Condition {
	text: string,
	icon: string
}

interface HourForecast {
	time: string,
	temp_c: number,
	condition: Condition
}
interface ForecastDay {
	date: string,
		day: {
			avgtemp_c: number,
			totalsnow_cm: number,
			condition: Condition
		},
		astro: {
			is_moon_up: number,
			is_sun_up: number
		},
		hour: Array<HourForecast>
}

export interface Response {
	location: {
		name: string,
		region: string,
		country: string,
		lat: number,
		lon: number,
		tz_id: string,
		localtime_epoch: number,
		localtime: string,
	}
	current: {
	condition: {},
	uv: number
	},
	forecast: {
		forecastday: Array<ForecastDay>		
	},
	error?: {
		code: number;
		message: string
	}
}

class WeatherService {

	getForecast = async <T>(location: Array<number | undefined> | string)
		: Promise<T | undefined> => {
		let preparedLocation
		if (typeof location === 'object' && Array.isArray(location)) {
			preparedLocation = location.join(',')
		} else preparedLocation = location
		const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=6400ced0d29c4968989150304230703&q=${preparedLocation}&days=10&aqi=no&alerts=no`)
		if (!response.ok) {
			const err = await response.json()
			throw { isError: true, msg: err.error.message }
		} else {
			return response.json()
		}
	} 

	getDailyForecast = (response: Response | undefined): Array<Forecast> | undefined => {
		if (response) {
			const { forecast } = response
			const dailyForecast = forecast.forecastday.map(({date, day: {avgtemp_c, condition: {icon,text}}} : ForecastDay) => {
				return {
					time: '00:00',
					date, 
					temp: avgtemp_c,
					icon,
					text
				}
			})
			return dailyForecast
		}
	}

	getHourlyForecast = (response: Response | undefined, currentTime: string): Array<Forecast> | undefined => {
		if (response) {
			const { forecast } = response
			const hourlyForecast = forecast.forecastday.slice(0, 2).map(({ date, hour }: ForecastDay) => {
				return hour.map(({ time, temp_c, condition: { icon, text } }: any) => {
					return {
						time: time.slice(11),
						date,
						temp: temp_c,
						icon,
						text
					}
				})			
			})			
			const timeLeft = hourlyForecast[0].filter(({ time }: any) => time >= (currentTime))
			return timeLeft.concat(hourlyForecast[1]).splice(0, 7)
		}
	}

	getLocation = (response: Response | undefined): Location | undefined => {
		if (response) {
			const { location: { name, country, lat, lon: long, localtime } } = response
			return {
				city: name,
				country,
				long,
				lat,
				dateTime: localtime
			}
		}
	}
	
	setForecasts = async (position: Array<number | undefined> | string,
		dispatch: Dispatch,
		setDailyForecast: (arg: Array<Forecast>) => Action,
		setHourlyForecast: (arg: Array<Forecast>) => Action,
		setLocation: (arg: Location) => Action,
		setError: (arg: Err) => Action,
	) => {
		try {
			const response = await this.getForecast<Response>(position)
			if (response) {
				const dailyRes = this.getDailyForecast(response)
				const now = new Date().getTime() - 3600000
				const currentTime = Intl.DateTimeFormat('ru-RU', {
					hour: "numeric",
					minute: "numeric",
				}).format(now)
				const hourlyRes = this.getHourlyForecast(response, currentTime)
				const location = this.getLocation(response)
				dailyRes && dispatch(setDailyForecast(dailyRes))
				hourlyRes && dispatch(setHourlyForecast(hourlyRes))
				location && dispatch(setLocation(location))
				dispatch(setError({isError: false, msg: null}))
			}
		} catch (err) {
			const isAnErr = (obj: any): obj is Err => {
				return 'isError' in obj && 'msg' in obj ;
			}
			isAnErr(err) && dispatch(setError(err))				
		}
  }
}

export default new WeatherService()

