import Auth from '../../api/auth/index';
export const AUTH_LOGIN_FETCHING = 'auth login is fetching';
export const AUTH_LOGIN_FAILED = 'auth login failed';
export const AUTH_LOGIN_COMPLETED = 'auth login completed';
export const AUTH_REGISTER_FETCHING = 'auth register fetching';
export const AUTH_REGISTER_COMPLETED = 'auth register completed';
export const AUTH_REGISTER_FAILED = 'auth register failed';
export const AUTH_UPDATE_PROFILE_FETCHING = 'auth update profile fetching';
export const AUTH_UPDATE_PROFILE_COMPLETED = 'auth update profile completed';
export const AUTH_UPDATE_PROFILE_FAILED = 'auth update profile failed';
export const AUTH_CHECK_TOKEN_FETCHING = 'auth token fetching';
export const AUTH_CHECK_TOKEN_COMPLETED = 'auth check token completed'
export const AUTH_CHECK_TOKEN_FAILED = 'auth check token failed'

export const AUTH_LOGOUT = 'auth logout'

export function authLogin(email, password) {
    return (dispatch)=> {
        dispatch({type: AUTH_LOGIN_FETCHING});
        Auth.login(email, password).then((user)=> {
            dispatch({type: AUTH_LOGIN_COMPLETED, user});
        }).catch((error)=> {
            dispatch({type: AUTH_LOGIN_FAILED, error: error.message})
            console.log(error);
        })
    }
}

export function authRegister(email, password) {
    return (dispatch)=> {
        dispatch({type: AUTH_REGISTER_FETCHING});
        Auth.register(email, password).then(function () {
            dispatch(authLogin(email, password))
        }).catch((error)=> {
            dispatch({type: AUTH_REGISTER_FAILED, error: error.message});
        });
    }
}

export function updateProfile(profile) {
    return (dispatch, getState)=> {
        let state = getState();
        dispatch({type: AUTH_UPDATE_PROFILE_FETCHING});
        Auth.updateProfile(profile, state.auth.authenticated.user.uid).then(()=> {
            dispatch({type: AUTH_UPDATE_PROFILE_COMPLETED, profile: profile})
        }).catch((error)=> {
            dispatch({type: AUTH_UPDATE_PROFILE_FAILED, error: error.message})
        })
    }
}

export function checkToken() {
    return (dispatch) => {
        dispatch({type: AUTH_CHECK_TOKEN_FETCHING});
        Auth.isAuthenticated().then((user)=> {
            dispatch({type: AUTH_CHECK_TOKEN_COMPLETED, user})
        }).catch(()=> {
            dispatch({type: AUTH_CHECK_TOKEN_FAILED, error: 'Not loggin member'})
        });
    }
}

export function authLogout() {
    return (dispatch) => {
        dispatch({type: AUTH_LOGOUT});
        Auth.logout();
    }
}