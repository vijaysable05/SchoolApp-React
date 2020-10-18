import {all, call} from 'redux-saga/effects'

import UserSagas from './user/UserSagas.js'

export default function* RootSagas() {
	yield all([

		call(UserSagas)
		
		])
}