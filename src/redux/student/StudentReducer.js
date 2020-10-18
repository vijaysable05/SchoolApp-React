import StudentActionTypes from './StudentActionTypes.js'

const INITIAL_STATE = {
	studentData: null
}


const StudentReducer = (state=INITIAL_STATE, action) => {

	switch(action.type) {

		case StudentActionTypes.SET_STUDENTDATA:
			return {
				studentData: action.payload
			}
		case StudentActionTypes.REMOVE_STUDENTDATA:
			return {
				studentData: null
			}
		default: 
			return state
	}

}


export default StudentReducer;