import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

// reducers
import auth from "./reducers/auth"

const initialState = {}

const middleware = [thunk]

// combining multiple reducers
const reducers = combineReducers({
  auth,
})

// creating store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
