import ClassActionTypes from './ClassActionTypes.js';

const INITIAL_STATE = {
	classData: null,
	classes: null,
	error: null,
	timetable: null,
	notification: null,
	leaveUpdated: false
}


const ClassReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case ClassActionTypes.SET_CLASS:
			return {
				...state,
				classData: action.payload
			}
		case ClassActionTypes.REMOVE_CLASS:
			return {
				...state,
				classData: null
			}
		// case ClassActionTypes.SET_CLASSES_START:
		// 	return {
		// 		...state,
		// 		isLoading: true
		// 	}
		case ClassActionTypes.SET_CLASSES_FAIL:
			return {
				...state,
				classes: null,
				error: action.payload
			}
		case ClassActionTypes.SET_CLASSES:
			return {
				...state,
				classes: action.payload,
				error: null
			}
		case ClassActionTypes.REMOVE_CLASSES:
			return {
				...state,
				classes: null
			}
		case ClassActionTypes.SET_TIMETABLE:
			return {
				...state,
				timetable: action.payload
			}
		case ClassActionTypes.REMOVE_TIMETABLE:
			return {
				...state,
				timetable: null
			}
		case ClassActionTypes.SET_NOTIFICATION:
			return {
				...state,
				notification: action.payload
			}
		case ClassActionTypes.REMOVE_NOTIFICATION:
			return {
				...state,
				notification: null
			}
		case ClassActionTypes.SET_LEAVE_UPDATED:
			return {
				...state,
				leaveUpdated: true
			}
		case ClassActionTypes.REMOVE_LEAVE_UPDATED:
			return {
				...state,
				leaveUpdated: false
			}
		default: 
			return state
	}
}

export default ClassReducer;