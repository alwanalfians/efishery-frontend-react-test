import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';
import { saveState, loadState } from '../services/localStorage';

const persistedState = loadState();
const store = createStore(reducer, persistedState, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    saveState('state', store.getState());
});

export default store;