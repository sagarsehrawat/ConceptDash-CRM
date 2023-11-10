import { configureStore } from '@reduxjs/toolkit'
import { batchedSubscribe } from 'redux-batched-subscribe'
import logger from 'redux-logger'
import _ from 'lodash'
import rfpSlice from './slices/rfpSlice.ts'
import privilegeSlice from './slices/privilegeSlice.ts'
import alertSlice from './slices/alertSlice.ts'

const debounceNotify = _.debounce((notify) => notify())

const reducer = {
    rfps: rfpSlice,
    privileges: privilegeSlice,
    alerts: alertSlice
}

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
    enhancers: [batchedSubscribe(debounceNotify)],
});