import eventReducer from './eventReducer'
import { combineReducers } from 'redux'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    event: eventReducer,
    auth: authReducer
})

export default rootReducer