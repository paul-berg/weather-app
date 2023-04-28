import WeatherService from "../../services/weatherService";
import { Response } from "../../services/weatherService";

const { getDailyForecast, getHourlyForecast, getLocation } = WeatherService

describe('WeatherService', () => {
	let response: Response

	beforeEach(() => {
		response = {
			location: {
				name: "Berezakartuzskaya",
				region: "Brestskaya Voblasts'",
				country: "Belarus",
				lat: 52.53,
				lon: 24.99,
				tz_id: "Europe/Minsk",
				localtime_epoch: 1679403156,
				localtime: "2023-03-21 15:52"
			},
			current: {
				"condition": {
				},
				"uv": 2.0
			},
			forecast: {
				forecastday: [
					{
						date: "2023-03-21",
						day: {
							avgtemp_c: 7.6,
							totalsnow_cm: 0.0,
							condition: {
								text: "Patchy rain possible",
								icon: "//cdn.weatherapi.com/weather/64x64/day/176.png"
							}
						},
						astro: {
							"is_moon_up": 0,
							"is_sun_up": 0
						},
						hour: [
							{
								time: "2023-03-21 01:00",
								temp_c: 8.3,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
							{
								time: "2023-03-21 02:00",
								temp_c: 8.5,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
							{
								time: "2023-03-21 03:00",
								temp_c: 8.7,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
							{
								time: "2023-03-21 04:00",
								temp_c: 8.9,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
							{
								time: "2023-03-21 05:00",
								temp_c: 9.1,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
							{
								time: "2023-03-21 06:00",
								temp_c: 9.3,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
							{
								time: "2023-03-21 07:00",
								temp_c: 9.5,
								condition: {
									text: "Overcast",
									icon: "//cdn.weatherapi.com/weather/64x64/night/122.png"
								}
							},
						]
					}
				]
			}
		}
	})

	it('getDailyForecast', () => {
		const dailyForecast = getDailyForecast(response)
		expect(dailyForecast).toEqual([
			{
				time: '00:00',
				date: '2023-03-21', 
				temp: 7.6,
				icon: '//cdn.weatherapi.com/weather/64x64/day/176.png',
				text: 'Patchy rain possible'
			}
		])
	})

	it('getHourlyForecast', () => {
		const hourlyForecast = getHourlyForecast(response, '00:00')
		expect(hourlyForecast).toEqual([
			{
				time: '01:00',
				date: '2023-03-21', 
				temp: 8.3,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			{
				time: '02:00',
				date: '2023-03-21', 
				temp: 8.5,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			{
				time: '03:00',
				date: '2023-03-21', 
				temp: 8.7,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			{
				time: '04:00',
				date: '2023-03-21', 
				temp: 8.9,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			{
				time: '05:00',
				date: '2023-03-21', 
				temp: 9.1,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			{
				time: '06:00',
				date: '2023-03-21', 
				temp: 9.3,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			{
				time: '07:00',
				date: '2023-03-21', 
				temp: 9.5,
				icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
				text: 'Overcast'
			},
			// {
			// 	time: '08:00',
			// 	date: '2023-03-21', 
			// 	temp: 9.7,
			// 	icon: "//cdn.weatherapi.com/weather/64x64/night/122.png",
			// 	text: 'Overcast'
			// },
			
		])
	})

	it('getLocation', () => {
		const location = getLocation(response)
		expect(location).toEqual({
			city: 'Berezakartuzskaya',
			country: 'Belarus',
			long: 24.99,
			lat: 52.53,
			dateTime: '2023-03-21 15:52'
		})
	})

})