import {
    AUTH_LOGIN_FETCHING, AUTH_LOGIN_COMPLETED, AUTH_LOGIN_FAILED, AUTH_LOGOUT,
    AUTH_REGISTER_FETCHING, AUTH_REGISTER_FAILED, AUTH_REGISTER_COMPLETED,
    AUTH_UPDATE_PROFILE_FETCHING, AUTH_UPDATE_PROFILE_COMPLETED, AUTH_UPDATE_PROFILE_FAILED,
    AUTH_CHECK_TOKEN_FETCHING, AUTH_CHECK_TOKEN_COMPLETED, AUTH_CHECK_TOKEN_FAILED
} from '../actions/AuthAction';
import update from 'react-addons-update';

/*let initinalState = {
 isAuthenticated:
 }*/

const getInitialState = () => {
    return {
        authenticated: {
            //guest: localStorage.getItem('authenticated') ? false : true,
            //user: JSON.parse(localStorage.getItem('authenticated')),
            guest: true,
            user: {},
            profile: {}
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

export default function auth_login(state = getInitialState(), action) {
    switch (action.type) {
        case AUTH_LOGIN_FETCHING:
            return update(state, {
                login: {
                    isFetching: {$set: true}
                }
            })
        case AUTH_LOGIN_COMPLETED:
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
        case AUTH_LOGIN_FAILED:
            localStorage.removeItem('authenticated');
            return update(state, {
                login: {
                    isFetching: {$set: false},
                    error: {$set: action.error}
                }
            });
        case AUTH_REGISTER_FETCHING:
            return update(state, {
                register: {
                    isFetching: {$set: true}
                }
            });
        case AUTH_REGISTER_COMPLETED:
            return update(state, {
                register: {
                    isFetching: {$set: false}
                }
            });
        case AUTH_REGISTER_FAILED:
            return update(state, {
                register: {
                    isFetching: {$set: false},
                    error: {$set: action.error}
                }
            });
        case AUTH_UPDATE_PROFILE_FETCHING:
            return update(state, {
                profile: {
                    isFetching: {$set: true},
                }
            });
        case AUTH_UPDATE_PROFILE_COMPLETED:
            return update(state, {
                profile: {
                    isFetching: {$set: false},
                },
                authenticated: {
                    profile: {$set: action.profile}
                }
            });
        case AUTH_UPDATE_PROFILE_FAILED:
            return update(state, {
                profile: {
                    isFetching: {$set: false},
                    error: {$set: action.error}
                }
            });
        case AUTH_CHECK_TOKEN_FETCHING:
            return update(state, {
                token: {
                    isFetching: {$set: true}
                }
            });
        case AUTH_CHECK_TOKEN_COMPLETED:
            return update(state, {
                token: {
                    isFetching: {$set: false}
                },
                authenticated: {
                    guest: {$set: false},
                    user: {$set: action.user}
                }
            })
        case AUTH_CHECK_TOKEN_FAILED:
            return update(state,{
                token:{
                    isFetching: {$set: false}
                },
                authenticated: {
                    guest: {$set: true},
                    user: {$set: {}},
                    profile: {$set: {}}
                }
            });
        case AUTH_LOGOUT:
            localStorage.removeItem('authenticated');
            return update(state, {$set: getInitialState()});
        default:
            return state;
    }
}