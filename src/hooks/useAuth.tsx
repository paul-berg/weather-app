import { useAppSelector } from "./useAppSelector";

const useAuth = () => {
	const isAuth = useAppSelector(state => state.user.isAuthorized);
    return isAuth
}

export {useAuth};
