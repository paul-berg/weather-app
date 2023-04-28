import { useGeolocated } from "react-geolocated";

const useCoordinates = () => {
	const position = useGeolocated({
		positionOptions: {
			enableHighAccuracy: false,
		},
		userDecisionTimeout: 5000
	}); 
	const coords = position.coords
    return coords
}

export {useCoordinates};
 