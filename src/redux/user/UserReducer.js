import UserActionTypes from './UserActionTypes.js';

const INITIAL_STATE = {
	currentUser: null,
	year: null,
	isFetching: false,
	error: false,
	isLoading: false
}


const UserReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case UserActionTypes.LOGIN_START:
		case UserActionTypes.LOGOUT_START:
			return {
				...state,
				isFetching: true
			}
		case UserActionTypes.LOGIN_SUCCESS:
			return {
				currentUser: action.payload,
				isFetching: false,
				year: null,
				error: false
			}
		case UserActionTypes.LOGIN_FAILURE:
		case UserActionTypes.LOGOUT_FAILURE:
			return {
				...state,
				isFetching: false,
				error: action.payload
			}
		case UserActionTypes.LOGOUT_SUCCESS:
			return {
				currentUser: null,
				year: null,
				isFetching: false,
				error: false
			}
		case UserActionTypes.SELECT_YEAR:
			return {
				...state,
				year: action.payload
			}
		case UserActionTypes.LOADING_START:
			return {
				...state,
				isLoading: true
			}
		case UserActionTypes.LOADING_END:
			return {
				...state,
				isLoading: false
			}
		default: 
			return state
	}
}

export default UserReducer;