import { GET_USER_DATA, SET_USER_DATA } from '../actions'

const initialState = null

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            state = action.payload
            return state
        }
        case GET_USER_DATA: {
            return state
        }
        default: {
            return state
        }
    }
}

export default userReducer