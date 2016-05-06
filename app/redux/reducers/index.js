import {combineReducers} from 'redux';
import auth from './auth';
import posts from './posts';
import {reducer as formReducer} from 'redux-form';
import {reducer as awaitReducer} from 'redux-await';
import await from './await';

export default combineReducers({
    auth,
    posts,
    form: formReducer,
    await
})