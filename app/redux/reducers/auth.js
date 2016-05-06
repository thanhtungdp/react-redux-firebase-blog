import {
    AUTH_LOGIN, AUTH_LOGOUT,
    AUTH_REGISTER,
    AUTH_GET_PROFILE,
    AUTH_UPDATE_PROFILE,
    AUTH_CHECK_TOKEN
} from '../actions/AuthAction';
import update from 'react-addons-update';
import {createReducer} from 'redux-create-reducer';

/*let initinalState = {
 isAuthenticated:
 }*/

const getInitialState = () => {
    return {
        authenticated: {
            guest: true,
            user: {},
            profile: {
                updated_at: '',
            }
        },
        register: {
            email: '',
            password: ''
        },
        logout: {
            isFetching: false,
        }
    }
}

export default createReducer(getInitialState(), {
    [AUTH_LOGIN](state, action){
        localStorage.setItem('authenticated', JSON.stringify(action.payload.userLogin));
        return update(state, {
            authenticated: {
                guest: {$set: false},
                user: {$set: action.payload.userLogin},
            }
        });
    },

    [AUTH_REGISTER](state, action){
        return update(state, {
            register: {$set: action.payload.userRegister}
        })
    },

    [AUTH_GET_PROFILE](state, action){
        let profile = {...action.payload.getProfile, updated_at: new Date().getTime()}
        return update(state, {
            authenticated: {
                profile: {$set: profile}
            }
        });
    },

    [AUTH_UPDATE_PROFILE](state, action){
        let profile = {...action.payload.updateProfile, updated_at: new Date().getTime()};

        return update(state, {
            authenticated: {
                profile: {$set: profile}
            }
        });
    },

    [AUTH_CHECK_TOKEN](state, action){
        return update(state, {
            authenticated: {
                guest: {$set: false},
                user: {$set: action.payload.userFromToken}
            }
        });
    },

    [AUTH_LOGOUT](state, action){
        return update(state, {$set: getInitialState()});
    }
});
