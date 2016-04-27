import {AUTH_IS_FETCHING, AUTH_LOGIN_COMPLETED, AUTH_LOGIN_FAILED, AUTH_LOGOUT_COMPLETED} from '../actions/AuthAction';

let initinalState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') ? true : false
}

export default function auth(state = initinalState, action) {
    switch (action.type) {
        case AUTH_IS_FETCHING:
            return {isFetching: true, isAuthenticated: false};
        case AUTH_LOGIN_COMPLETED:
            localStorage.setItem('isAuthenticated', true);
            return {isFetching: false, isAuthenticated: true, profile: action.user, error: ''};
        case AUTH_LOGIN_FAILED:
            localStorage.setItem('isAuthenticated', false);
            return {isFetching: false, isAuthenticated: false, error: action.error}
        case AUTH_LOGOUT_COMPLETED:
            localStorage.setItem('isAuthenticated', false);
            return {isFetching: false, isAuthenticated: false}
        default:
            return state
    }
}