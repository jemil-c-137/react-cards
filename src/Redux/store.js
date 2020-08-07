
import {compose, createStore} from "redux";
import cardsReducer from "./rootReducer";




let store = createStore(cardsReducer,
  compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

window.store = store

export default store
