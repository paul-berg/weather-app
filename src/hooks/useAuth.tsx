import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useAuth = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuthorized);
    return isAuth
}

export {useAuth};
