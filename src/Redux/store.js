
import {combineReducers, compose, createStore} from "redux";
import cardsReducer from "./rootReducer";


let reducers = combineReducers(
  {cardsPageRed: cardsReducer}
)

let store = createStore(reducers,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

window.store = store

export default store
