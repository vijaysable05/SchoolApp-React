import UserActionTypes from './UserActionTypes.js';

export const LoginStart = (usernameAndpassword) => ({
	type: UserActionTypes.LOGIN_START,
	payload: usernameAndpassword
})

export const LoginSuccess = (user) => ({
	type: UserActionTypes.LOGIN_SUCCESS,
	payload: user
})

export const LoginFailure = (error) => ({
	type: UserActionTypes.LOGIN_FAILURE,
	payload: error
})

export const LogoutStart = (loginAndtoken) => ({
	type: UserActionTypes.LOGOUT_START,
	payload: loginAndtoken
})

export const LogoutSuccess = () => ({
	type: UserActionTypes.LOGOUT_SUCCESS
})

export const LogoutFailure = (error) => ({
	type: UserActionTypes.LOGOUT_FAILURE,
	payload: error
})

export const YearSelected = (year) => ({
	type: UserActionTypes.SELECT_YEAR,
	payload: year
})

export const LoadingStart = () => ({
	type: UserActionTypes.LOADING_START
})

export const LoadingEnd = () => ({
	type: UserActionTypes.LOADING_END
})
