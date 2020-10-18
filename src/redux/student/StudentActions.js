import StudentActionTypes from './StudentActionTypes.js'


export const setStudentData = (stdentdata) => ({
	type: StudentActionTypes.SET_STUDENTDATA,
	payload: stdentdata
})

export const removeStudentData = () => ({
	type: StudentActionTypes.REMOVE_STUDENTDATA
})