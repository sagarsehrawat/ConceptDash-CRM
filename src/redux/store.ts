import { configureStore } from '@reduxjs/toolkit'
import { batchedSubscribe } from 'redux-batched-subscribe'
import logger from 'redux-logger'
import _ from 'lodash'
import rfpSlice from './slices/rfpSlice.ts'
import privilegeSlice from './slices/privilegeSlice.ts'
import alertSlice from './slices/alertSlice.ts'
import projectSlice from './slices/projectSlice.ts'
import budgetSlice from './slices/budgetSlice.ts'
import proposalSlice from './slices/proposalSlice.ts'
import campaignListSlice from './slices/campaignListSlice.js'

const debounceNotify = _.debounce((notify) => notify())

const reducer = {
    rfps: rfpSlice,
    privileges: privilegeSlice,
    alerts: alertSlice,
    proposals: proposalSlice,
    projects: projectSlice,
    budgets: budgetSlice,
    campaignList: campaignListSlice
}

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
    devTools: true,
    enhancers: [batchedSubscribe(debounceNotify)],
});