import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
    return createStore(
        rootReducers,
        initialState,
        compose(
            applyMiddleware(thunkMiddleware, loggerMiddleware),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}