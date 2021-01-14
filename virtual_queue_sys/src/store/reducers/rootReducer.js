import eventReducer from './eventReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    event: eventReducer
})

export default rootReducer