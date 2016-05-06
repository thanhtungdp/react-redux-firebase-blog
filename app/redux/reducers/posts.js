import {
    POST_LISTS, POST_CREATE, POST_VIEW, POST_EDIT, POST_RESET, POST_LISTS_LOAD_MORE
} from '../actions/PostAction';
import update from 'react-addons-update';
import {createReducer} from 'redux-create-reducer';
import {postsList} from '../../configs/index';

const getInitialState = () => {
    return {
        lists: [],
        currentItems: postsList.perPage, //pagination
        currentPost: {
            user: {}
        }
    }
}

export default createReducer(getInitialState(), {
    [POST_LISTS](state, action){
        return update(state, {
            lists: {$set: action.payload.getPosts}
        });
    },
    [POST_CREATE](state, action){
        return update(state, {
            currentPost: {$set: action.payload.createPost}
        })
    },
    [POST_VIEW](state, action){
        return update(state, {
            currentPost: {$set: action.payload.getPost}
        });
    },
    [POST_RESET](state){
        return update(state, {
            currentPost: {$set: {user: {}}}
        });
    },
    [POST_LISTS_LOAD_MORE](state, action){
        return update(state, {
            currentItems: {
                $apply: (value) => {
                    let currentItems = value + action.loadMore;
                    if(currentItems < state.lists.length)
                        return currentItems;
                    else return state.lists.length
                }
            }
        })
    }
});