import {AWAIT_MARKER} from 'redux-await';
import Auth from '../../api/auth/index';

export const AUTH_LOGIN = 'auth login';

export const AUTH_REGISTER = 'auth register';

export const AUTH_GET_PROFILE = 'auth get profile'

export const AUTH_UPDATE_PROFILE = 'auth update profile fetching';

export const AUTH_CHECK_TOKEN = 'auth check token';

export const AUTH_LOGOUT = 'auth logout'

/**
 * Login with email, password
 * @param email
 * @param password
 * @returns {Function}
 */
export function authLogin(email, password) {
    return (dispatch)=> {
        dispatch({
            type: AUTH_LOGIN,
            AWAIT_MARKER,
            payload: {
                userLogin: Auth.login(email, password)
            }
        });
    }
}

/**
 * Register and login
 * @param email
 * @param password
 * @returns {Function}
 */
export function authRegister(email, password, profile = {}) {
    return (dispatch)=> {
        dispatch({
            type: AUTH_REGISTER,
            AWAIT_MARKER,
            payload: {
                userRegister: Auth.register(email, password, profile)
            }
        });
    }
}

export function updateProfile(profile) {
    return (dispatch, getState)=> {
        let auth = getState().auth.authenticated;
        dispatch({
            type: AUTH_UPDATE_PROFILE,
            AWAIT_MARKER,
            payload: {
                updateProfile: Auth.updateProfile(profile, auth.user.uid)
            }
        });
    }
}

export function getProfile() {
    return (dispatch, getState)=> {
        let auth = getState().auth.authenticated;
        if (!auth.profile.updated_at) {
            dispatch({
                type: AUTH_GET_PROFILE,
                AWAIT_MARKER,
                payload: {
                    getProfile: Auth.getProfile(auth.user.uid)
                }
            });
        }
    }
}

export function checkToken() {
    return (dispatch) => {
        dispatch({
            type: AUTH_CHECK_TOKEN,
            AWAIT_MARKER,
            payload: {
                userFromToken: Auth.isAuthenticated()
            }
        })
    }
}

export function authLogout() {
    return (dispatch) => {
        dispatch({type: AUTH_LOGOUT});
        Auth.logout();
    }
}