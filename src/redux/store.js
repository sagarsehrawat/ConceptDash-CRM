import { configureStore } from '@reduxjs/toolkit'
import projectsReducer from './projectsSlice'
import { batchedSubscribe } from 'redux-batched-subscribe'
import logger from 'redux-logger'
import _ from 'lodash'

const debounceNotify = _.debounce((notify) => notify())

const reducer = {
    projects: projectsReducer
}

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [batchedSubscribe(debounceNotify)],
});