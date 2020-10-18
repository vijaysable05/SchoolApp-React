import UserReducer from './user/UserReducer.js';
import ClassReducer from './class/ClassReducer.js';
import StaffReducer from './staff/StaffReducer.js';
import StudentReducer from './student/StudentReducer.js';

import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user']
}

const RootReducer = combineReducers({
	user: UserReducer,
	class: ClassReducer,
	staff: StaffReducer,
	student: StudentReducer
})

export default persistReducer(persistConfig, RootReducer)