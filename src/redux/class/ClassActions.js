import ClassActionTypes from './ClassActionTypes.js'

export const SetClass = (class1) => ({
	type: ClassActionTypes.SET_CLASS,
	payload: class1
})

export const RemoveClass = () => ({
	type: ClassActionTypes.REMOVE_CLASS
})

export const SetClassesStart = () => ({
	type: ClassActionTypes.SET_CLASSES_START
})

export const SetClasses = (classes) => ({
	type: ClassActionTypes.SET_CLASSES,
	payload: classes
})

export const SetClassesFail = (error) => ({
	type: ClassActionTypes.SET_CLASSES_FAIL,
	payload: error
})

export const RemoveClasses = () => ({
	type: ClassActionTypes.REMOVE_CLASSES
})

export const SetTimetable = (timetable) => ({
	type: ClassActionTypes.SET_TIMETABLE,
	payload: timetable
})

export const RemoveTimetable = () => ({
	type: ClassActionTypes.REMOVE_TIMETABLE
})

export const SetNotification = (notification) => ({
	type: ClassActionTypes.SET_NOTIFICATION,
	payload: notification
})

export const RemoveNotification = () => ({
	type: ClassActionTypes.REMOVE_NOTIFICATION
})

export const SetLeaveUpdated = () => ({
	type: ClassActionTypes.SET_LEAVE_UPDATED
})

export const RemoveLeaveUpdated = () => ({
	type: ClassActionTypes.REMOVE_LEAVE_UPDATED
})