import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from './reducers/rootReducers';

export default () =>
  createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));