import userReducer from './reducers/userReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    userReducer,
})

export default reducers