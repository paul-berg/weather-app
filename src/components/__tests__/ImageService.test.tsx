import imageService from "../../services/imageService";
// import { Response } from "../../services/weatherService";

const { setBackground } = imageService

// images: Images = {
// 	blizzard: require('../assets/blizzard.jpg'), 
// 	sunny: require('../assets//sunny.jpg') ,
// 	cloudy: require('../assets//cloudy.jpg') ,
// 	drizzle: require('../assets//drizzle.jpg'), 
// 	icePellets: require('../assets//icePellets.jpg'), 
// 	mist: require('../assets//mist.jpg'), 
// 	overcast: require('../assets//overcast.jpg'), 
// 	partlyCloudy: require('../assets//partlyCloudy.jpg'),
// 	rain: require('../assets//rain.jpg'),
// 	snow: require('../assets//snow.jpg'),
// 	thunder: require('../assets//thunder.jpg'),	
// }

// if (lowWeatherType === 'partly cloudy') {
// 	return this.images.partlyCloudy
// } else if (lowWeatherType === 'sunny') {
// 	return this.images.sunny
// } else if (lowWeatherType === 'cloudy') {
// 	return this.images.cloudy
// } else if (lowWeatherType === 'overcast') {
// 	return this.images.overcast
// } else if (lowWeatherType === 'blizzard') {
// 	return this.images.blizzard
// } else if (lowWeatherType.includes('drizzle')) {
// 	return this.images.drizzle
// } else if (lowWeatherType.includes('rain')) {
// 	return this.images.rain
// } else if (lowWeatherType === 'mist' || lowWeatherType.includes('fog')) {
// 	return this.images.mist
// } else if (lowWeatherType.includes('sleet') || lowWeatherType.includes('snow')) {
// 	return this.images.mist
// } else if (lowWeatherType.includes('thunder') || lowWeatherType.includes('snow')) {
// 	return this.images.thunder

describe('ImageService', () => {

	it('is partly cloudy weather', () => {
		const background = setBackground('partly cloudy')
		expect(background).toEqual(require('../../assets//partlyCloudy.jpg'))
	})

	it('is sunny weather', () => {
		const background = setBackground('sunny')
		expect(background).toEqual(require('../../assets//sunny.jpg'))
	})

	it('is cloudy weather', () => {
		const background = setBackground('cloudy')
		expect(background).toEqual(require('../../assets//cloudy.jpg'))
	})

	it('is overcasty weather', () => {
		const background = setBackground('overcast')
		expect(background).toEqual(require('../../assets//overcast.jpg'))
	})

	it('is blizzardy weather', () => {
		const background = setBackground('blizzard')
		expect(background).toEqual(require('../../assets//blizzard.jpg'))
	})

	it('is drizzly weather', () => {
		const backgroundLightDrizzle = setBackground('Light drizzle')
		const backgroundPatchyLightDrizzle = setBackground('Patchy light drizzle')
		const backgroundFreezingDrizzle = setBackground('Freezing drizzle')
		const backgroundHeavyFreezingDrizzle = setBackground('Heavy freezing drizzle')
		const backgroundPatchyFreezingDrizzlePossible = setBackground('Patchy freezing drizzle possible')

		expect(backgroundLightDrizzle).toEqual(require('../../assets//drizzle.jpg'))
		expect(backgroundPatchyLightDrizzle).toEqual(require('../../assets//drizzle.jpg'))
		expect(backgroundFreezingDrizzle).toEqual(require('../../assets//drizzle.jpg'))
		expect(backgroundHeavyFreezingDrizzle).toEqual(require('../../assets//drizzle.jpg'))
		expect(backgroundPatchyFreezingDrizzlePossible).toEqual(require('../../assets//drizzle.jpg'))
	})

	it('is rainy weather', () => {
		const backgroundPatchyRainPossible = setBackground('Patchy rain possible')
		const backgroundPatchyLightRain	= setBackground('Patchy light rain')
		const backgroundLightRain = setBackground('Light rain')
		const backgroundModerateRainAtTimes = setBackground('Moderate rain at times')
		const backgroundModerateRain = setBackground('Moderate rain')
		const backgroundHeavyRainAtTimes = setBackground('Heavy rain at times')
		const backgroundHeavyRain = setBackground('Heavy rain')
		const backgroundLightFreezingRain = setBackground('Light freezing rain')
		const backgroundModerateOrHeavyFreezingRain = setBackground('Moderate or heavy freezing rain')
		const backgroundLightRainShower = setBackground('Light rain shower')
		const backgroundModerateOrHeavyRainShower = setBackground('Moderate or heavy rain shower')
		const backgroundTorrentialRainShower = setBackground('Torrential rain shower')

		expect(backgroundPatchyRainPossible).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundPatchyLightRain).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundLightRain).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundModerateRainAtTimes).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundModerateRain).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundHeavyRainAtTimes).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundHeavyRain).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundLightFreezingRain).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundPatchyRainPossible).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundModerateOrHeavyFreezingRain).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundLightRainShower).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundModerateOrHeavyRainShower).toEqual(require('../../assets//rain.jpg'))
		expect(backgroundTorrentialRainShower).toEqual(require('../../assets//rain.jpg'))
	})

	it('is misty weather', () => {
		const backgroundMist = setBackground('Mist')
		const backgroundFog = setBackground('Fog')
		const backgroundFreezingFog = setBackground('Freezing fog')
	
		expect(backgroundMist).toEqual(require('../../assets//mist.jpg'))
		expect(backgroundFog).toEqual(require('../../assets//mist.jpg'))
		expect(backgroundFreezingFog).toEqual(require('../../assets//mist.jpg'))
	})

	it('is snowy weather', () => {
		const backgroundPatchySnowPossible = setBackground('Patchy snow possible')
		const backgroundPatchySleetPossible = setBackground('Patchy sleet possible')
		const backgroundLightSleet = setBackground('Light sleet')
		const backgroundModerateOrHeavySleet = setBackground('Moderate or heavy sleet')
		const backgroundPatchyLightSnow = setBackground('Patchy light snow')
		const backgroundLightSnow = setBackground('Light snow')
		const backgroundPatchyModerateSnow = setBackground('Patchy moderate snow')
		const backgroundModerateSnow = setBackground('Moderate snow')
		const backgroundPatchyHeavySnow = setBackground('Patchy heavy snow')
		const backgroundHeavySnow = setBackground('Heavy snow')
		const backgroundLightSleetShowers = setBackground('Light sleet showers')
		const backgroundModerateOrHeavySleetShowers = setBackground('Moderate or heavy sleet showers')
		const backgroundLightSnowShowers = setBackground('Light snow showers')
		const backgroundModerateOrHeavySnowShowers = setBackground('Moderate or heavy snow showers')
		const backgroundBlowingSnow = setBackground('Blowing snow')
	
		expect(backgroundPatchySnowPossible).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundPatchySleetPossible).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundLightSleet).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundModerateOrHeavySleet).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundPatchyLightSnow).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundLightSnow).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundPatchyModerateSnow).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundModerateSnow).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundPatchyHeavySnow).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundHeavySnow).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundLightSleetShowers).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundModerateOrHeavySleetShowers).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundModerateOrHeavySleetShowers).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundLightSnowShowers).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundModerateOrHeavySnowShowers).toEqual(require('../../assets//snow.jpg'))
		expect(backgroundBlowingSnow).toEqual(require('../../assets//snow.jpg'))
	})

	it('is thundery weather', () => {
		const backgroundThunderyOutbreaksPossible = setBackground('Thundery outbreaks possible')
		const backgroundPatchyLightRainWithThunder = setBackground('Patchy light rain with thunder')
		const backgroundModerateOrHeavyRainWithThunder = setBackground('Moderate or heavy rain with thunder')
		const backgroundPatchyLightSnowWithThunder = setBackground('Patchy light snow with thunder')
		const backgroundModerateOrHeavySnowWithThunder = setBackground('Moderate or heavy snow with thunder')
	
		expect(backgroundThunderyOutbreaksPossible).toEqual(require('../../assets//thunder.jpg'))
		expect(backgroundPatchyLightRainWithThunder).toEqual(require('../../assets//thunder.jpg'))
		expect(backgroundModerateOrHeavyRainWithThunder).toEqual(require('../../assets//thunder.jpg'))
		expect(backgroundPatchyLightSnowWithThunder).toEqual(require('../../assets//thunder.jpg'))
		expect(backgroundModerateOrHeavySnowWithThunder).toEqual(require('../../assets//thunder.jpg'))
	})

})