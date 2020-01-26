import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import GeneratePinReducer from './reducers/GeneratePinReducer';

// Redux Debugger
let composeEnhancer = compose;

if (__DEV__) {
  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const Reducers = {
  appData: GeneratePinReducer,
};

const Store = createStore(
  combineReducers(Reducers),
  composeEnhancer(applyMiddleware(thunk)),
);

export default Store;
