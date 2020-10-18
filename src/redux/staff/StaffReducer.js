import StaffActionTypes from './StaffActionTypes.js'

const INITIAL_STATE = {
	staffData: null
}


const StaffReducer = (state=INITIAL_STATE, action) => {

	switch(action.type) {

		case StaffActionTypes.SET_STAFFDATA:
			return {
				staffData: action.payload
			}
		case StaffActionTypes.REMOVE_STAFFDATA:
			return {
				staffData: null
			}
		default: 
			return state
	}

}


export default StaffReducer;
