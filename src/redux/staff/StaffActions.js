import StaffActionTypes from './StaffActionTypes.js'


export const setStaffData = (staffdata) => ({
	type: StaffActionTypes.SET_STAFFDATA,
	payload: staffdata
})

export const removeStaffData = () => ({
	type: StaffActionTypes.REMOVE_STAFFDATA
})

