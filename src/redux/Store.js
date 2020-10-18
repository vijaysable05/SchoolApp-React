import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import RootReducer from './RootReducer.js'
import RootSagas from './RootSagas.js'
import createSagaMiddleware from 'redux-saga'
import {persistStore} from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if(process.env.NODE_ENV === 'development') {
	middlewares.push(logger)
}

export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

sagaMiddleware.run(RootSagas)

export const persistor = persistStore(store)
