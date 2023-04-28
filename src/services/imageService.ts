
interface Images {
	blizzard: any;
	sunny: any;
	cloudy: any;
	drizzle: any; 
	icePellets: any;
	mist: any; 
	overcast: any; 
	partlyCloudy: any; 
	rain: any; 
	snow: any; 
	thunder: any; 	
}

class imageService {
	images: Images = {
		blizzard: require('../assets/blizzard.jpg'), 
		sunny: require('../assets//sunny.jpg') ,
		cloudy: require('../assets//cloudy.jpg') ,
		drizzle: require('../assets//drizzle.jpg'), 
		icePellets: require('../assets//icePellets.jpg'), 
		mist: require('../assets//mist.jpg'), 
		overcast: require('../assets//overcast.jpg'), 
		partlyCloudy: require('../assets//partlyCloudy.jpg'),
		rain: require('../assets//rain.jpg'),
		snow: require('../assets//snow.jpg'),
		thunder: require('../assets//thunder.jpg'),	
	}

	setBackground = (weatherType: string) => {
		const lowWeatherType = weatherType.toLocaleLowerCase()
		if (lowWeatherType === 'partly cloudy') {
			return this.images.partlyCloudy
		} else if (lowWeatherType === 'sunny') {
			return this.images.sunny
		} else if (lowWeatherType === 'cloudy') {
			return this.images.cloudy
		} else if (lowWeatherType === 'overcast') {
			return this.images.overcast
		} else if (lowWeatherType === 'blizzard') {
			return this.images.blizzard
		} else if (lowWeatherType.includes('drizzle')) {
			return this.images.drizzle
		} else if ((lowWeatherType.includes('thunder') && lowWeatherType.includes('rain')) ||
			(lowWeatherType.includes('thunder') && lowWeatherType.includes('snow')) ||
			lowWeatherType.includes('thundery')) {
			return this.images.thunder
		} else if (lowWeatherType.includes('rain')) {
			return this.images.rain
		} else if (lowWeatherType === 'mist' || lowWeatherType.includes('fog')) {
			return this.images.mist
		} else if (lowWeatherType.includes('sleet') || lowWeatherType.includes('snow')) {
			return this.images.snow
		} 
	}
}

export default new imageService()
