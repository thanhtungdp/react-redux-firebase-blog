import {
    AUTH_LOGIN_FETCHING, AUTH_LOGIN_COMPLETED, AUTH_LOGIN_FAILED, AUTH_LOGOUT,
    AUTH_REGISTER_FETCHING, AUTH_REGISTER_FAILED, AUTH_REGISTER_COMPLETED,
    AUTH_GET_PROFILE_FETCHING, AUTH_GET_PROFILE_FAILED, AUTH_GET_PROFILE_COMPLETED,
    AUTH_UPDATE_PROFILE_FETCHING, AUTH_UPDATE_PROFILE_COMPLETED, AUTH_UPDATE_PROFILE_FAILED,
    AUTH_CHECK_TOKEN_FETCHING, AUTH_CHECK_TOKEN_COMPLETED, AUTH_CHECK_TOKEN_FAILED
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
                isFetching: false,
                updated_at: '',
                payload: {}
            }
        },
        login: {
            isFetching: false,
            error: ''
        },
        register: {
            isFetching: false,
            error: ''
        },
        profile: {
            isFetching: false,
            error: ''
        },
        logout: {
            isFetching: false,
        },
        token: {
            token: '',
            isFetching: false,
            error: ''
        }
    }
}

export default createReducer(getInitialState(), {
    [AUTH_LOGIN_FETCHING](state, action){
        return update(state, {
            login: {
                isFetching: {$set: true}
            }
        })
    },
    [AUTH_LOGIN_COMPLETED](state, action){
        localStorage.setItem('authenticated', JSON.stringify(action.user));
        return update(state, {
            authenticated: {
                guest: {$set: false},
                user: {$set: action.user},
            },
            login: {
                isFetching: {$set: false}
            }
        });
    },
    [AUTH_LOGIN_FAILED](state, action){
        localStorage.removeItem('authenticated');
        return update(state, {
            login: {
                isFetching: {$set: false},
                error: {$set: action.error}
            }
        });
    },
    [AUTH_REGISTER_FETCHING](state, action){
        return update(state, {
            register: {
                isFetching: {$set: true}
            }
        });
    },
    [AUTH_REGISTER_COMPLETED](state, action){
        return update(state, {
            register: {
                isFetching: {$set: false}
            }
        });
    },
    [AUTH_REGISTER_FAILED](state, action){
        return update(state, {
            register: {
                isFetching: {$set: false},
                error: {$set: action.error}
            }
        });
    },
    [AUTH_GET_PROFILE_FETCHING](state, action){
        return update(state, {
            authenticated: {
                profile: {
                    isFetching: {$set: true}
                }
            }
        });
    },
    [AUTH_GET_PROFILE_FAILED](state, action){
        return update(state, {
            authenticated: {
                profile: {
                    isFetching: {$set: false}
                }
            }
        })
    },
    [AUTH_GET_PROFILE_COMPLETED](state, action){
        return update(state, {
            authenticated: {
                profile: {
                    isFetching: {$set: false},
                    payload: {$set: action.payload}
                }
            }
        });
    },

    [AUTH_UPDATE_PROFILE_FETCHING](state, action){
        return update(state, {
            profile: {
                isFetching: {$set: true},
            }
        });
    },
    [AUTH_UPDATE_PROFILE_COMPLETED](state, action){
        return update(state, {
            profile: {
                isFetching: {$set: false},
            },
            authenticated: {
                profile: {$set: action.profile}
            }
        });
    },
    [AUTH_UPDATE_PROFILE_FAILED](state, action){
        return update(state, {
            profile: {
                isFetching: {$set: false},
                error: {$set: action.error}
            }
        });
    },

    [AUTH_CHECK_TOKEN_FETCHING](state, action){
        return update(state, {
            token: {
                isFetching: {$set: true}
            }
        });
    },
    [AUTH_CHECK_TOKEN_COMPLETED](state, action){
        return update(state, {
            token: {
                isFetching: {$set: false}
            },
            authenticated: {
                guest: {$set: false},
                user: {$set: action.user}
            }
        })
    },
    [AUTH_CHECK_TOKEN_FAILED](state, action){
        return update(state, {
            token: {
                isFetching: {$set: false}
            },
            authenticated: {
                guest: {$set: true},
                user: {$set: {}},
                profile: {$set: {}}
            }
        });
    },
    [AUTH_LOGOUT](state, action){
        return update(state, {$set: getInitialState()});
    }
});
