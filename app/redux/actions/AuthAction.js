import Auth from '../../api/auth/index';
export const AUTH_IS_FETCHING = 'auth is logging';
export const AUTH_LOGIN_FAILED = 'auth is logging failed';
export const AUTH_LOGIN_COMPLETED = 'auth is logging complete';
export const AUTH_LOGOUT_COMPLETED = 'auth is logout';

export function authLogin(email, password) {
    return (dispatch)=> {
        dispatch({type: AUTH_IS_FETCHING});
        Auth.login(email, password).then((user)=> {
            dispatch({type: AUTH_LOGIN_COMPLETED, user});
        }).catch((error)=> {
            dispatch({type: AUTH_LOGIN_FAILED, error: error.message})
            console.log(error);
        })
    }
}

export function isAuthenticated() {
    return (dispatch) => {
        dispatch({type: AUTH_IS_FETCHING});
        Auth.isAuthenticated().then((user)=> {
            dispatch({type: AUTH_LOGIN_COMPLETED, user})
        }).catch(()=> {
            dispatch({type: AUTH_LOGIN_FAILED, error: 'Not loggin member'})
        });
    }
}

export function authLogout() {
    return (dispatch) => {
        dispatch({type: AUTH_IS_FETCHING});
        Auth.logout().then(()=> {
            dispatch({type: AUTH_LOGOUT_COMPLETED})
        });
    }
}