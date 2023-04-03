import { useGeolocated } from "react-geolocated";

const useCoordinates = () => {
	const { coords } = useGeolocated({
			positionOptions: {
					enableHighAccuracy: false,
			},
			userDecisionTimeout: 5000,
	}); 
    return coords
}

export {useCoordinates};
 