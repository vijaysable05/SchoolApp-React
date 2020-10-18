import {takeLatest, put, call, all} from 'redux-saga/effects';

import UserActionTypes from './UserActionTypes.js';
import {LoginSuccess, LoginFailure, LogoutSuccess, LogoutFailure} from './UserActions.js';
import {RemoveClasses} from '../class/ClassActions.js';


function* LoginFetch({payload: {username, password, login}}) {
	try {

		let url = null

		if(login==='admin') {
			url = `${process.env.REACT_APP_API_URL}/admin/login`
		} else if(login==='student') {
			url = `${process.env.REACT_APP_API_URL}/student/login`
		} else if(login==='teacher') {
			url = `${process.env.REACT_APP_API_URL}/staff/login`
		}

		const response = yield fetch(url, {
			method: 'POST',
			headers: { 
		        "Content-type": "application/json; charset=UTF-8"
		    },
		    body: JSON.stringify({ 
		        username: username, 
		        password: password
		    }), 
		})

		const data = yield response.json()

		if(data.hasOwnProperty('error')) {
			yield put(LoginFailure(data.error))
		} else {
			yield put(LoginSuccess(data))
		}


	} catch(e) {

		yield put(LoginFailure(e))

	}
}

function* LoginFetchStart() {
	yield takeLatest(UserActionTypes.LOGIN_START, LoginFetch)
}


function* LogoutFetch({payload: {login, token}}) {
	try {

		let url = null

		if(login.hasOwnProperty('admin')) {
			url = `${process.env.REACT_APP_API_URL}/admin/logout`
		} else if(login.hasOwnProperty('student')) {
			url = `${process.env.REACT_APP_API_URL}/student/logout`
		} else if(login.hasOwnProperty('staff')) {
			url = `${process.env.REACT_APP_API_URL}/staff/logout`
		}

		const response = yield fetch(url, {
			method: 'POST',
			headers: {
		        "Content-type": "application/json; charset=UTF-8",
		        'Authorization': 'Bearer ' + token,
		    }
		})

		const data = yield response.json()

		if(data.success) {
			yield put(LogoutSuccess())
			yield put(RemoveClasses())
		}


	} catch(e) {

		yield put(LogoutFailure(e))

	}
}


function* LogoutFetchStart() {
	yield takeLatest(UserActionTypes.LOGOUT_START, LogoutFetch)
}


export default function* UserSagas() {
	yield all([
		call(LoginFetchStart),
		call(LogoutFetchStart)
	])
}