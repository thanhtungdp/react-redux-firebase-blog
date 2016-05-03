import {
    POST_CREATE_FETCHING, POST_CREATE_COMPLETED, POST_CREATE_FAILED,
    POST_LISTS_FETCHING, POST_LISTS_FAILED, POST_LISTS_COMPLETED,
} from '../actions/PostAction';
import update from 'react-addons-update';
import {createReducer} from 'redux-create-reducer';

/*let initinalState = {
 isAuthenticated:
 }*/

const getInitialState = () => {
    return {
        lists: {
            isFetching: false,
            payload: {
                posts: []
            }
        },
        create: {
            isFetching: false,
            error: '',
            completed: false,
        }
    }
}

export default createReducer(getInitialState(), {
    [POST_CREATE_FETCHING](state){
        return update(state, {
            create: {
                isFetching: {$set: true}
            }
        });
    },
    [POST_CREATE_COMPLETED](state, action){
        return update(state, {
            create: {
                isFetching: {$set: false},
                completed: {$set: true},
                post: {$set: action.post},
                id: {$set: action.id}
            }
        });
    },
    [POST_CREATE_FAILED](state, action){
        return update(state, {
            create: {
                isFetching: {$set: false},
                error: {$set: action.error}
            }
        });
    },
    [POST_LISTS_FETCHING](state, action){
        return update(state, {
            lists: {
                isFetching: {$set: true}
            }
        })
    },
    [POST_LISTS_FAILED](state, action){
        return update(state, {
            lists: {
                isFetching: {$set: false},
                error: {$set: action.error}
            }
        })
    },
    [POST_LISTS_COMPLETED](state, action){
        return update(state, {
            lists: {
                isFetching: {$set: false},
                payload: {$set: action.payload}
            }
        })
    }
});