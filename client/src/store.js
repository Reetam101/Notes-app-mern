import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  // this will contain our reducers

})

const initialState = {}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
)

export default store