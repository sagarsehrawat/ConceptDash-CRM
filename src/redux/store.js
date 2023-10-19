import { configureStore } from '@reduxjs/toolkit'
import rfpReducer from './slices/rfpSlice'
import { batchedSubscribe } from 'redux-batched-subscribe'
import logger from 'redux-logger'
import _ from 'lodash'

const debounceNotify = _.debounce((notify) => notify())

const reducer = {
    rfps: rfpReducer
}

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [batchedSubscribe(debounceNotify)],
});