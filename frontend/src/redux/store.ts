// https://www.valentinog.com/blog/redux/
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import authReducer from './auth'
import Auth from '../models/auth'

const rootReducer = combineReducers({
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type Store = {
  auth: Auth
}
