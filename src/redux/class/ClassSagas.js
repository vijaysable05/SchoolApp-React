import {takeLatest, call, put, all} from 'redux-saga/effects';

import ClassActionTypes from './ClassActionTypes.js';
import {SetClasses, SetClassesFail} from './ClassActions.js';

import selectYearAndToken from './selector.js';



function* setClasses() {
	try {
		const {year, token} = selectYearAndToken
		
		let url = `${process.env.REACT_APP_API_URL}/getclasses/0/0/createdAt:asc?year=${year}`
		let array = []

		const response = yield fetch(url, {
			method: 'GET',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + token
		    }
		})
		const data = yield response.json()

		data.forEach((class1) => {
			array.push({class: class1.class, classid: class1._id, divisions: class1.divisions})
		})

		yield put(SetClasses(array))

	} catch(error) {
		yield put(SetClassesFail(error))
	}
}


function* fetchClasses() {
	yield takeLatest(ClassActionTypes.SET_CLASSES_START, setClasses)
} 



export default function* ClassSagas() {
	yield all([
		call(fetchClasses)
		])
}
