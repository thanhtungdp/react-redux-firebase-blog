import {AWAIT_MARKER} from 'redx-await';
import PostApi from '../../api/post/index';

export const POST_CREATE_FETCHING = 'post create fetching';
export const POST_CREATE_FAILED = 'post create failed';
export const POST_CREATE_COMPLETED = 'post create completed';

export const POST_LISTS_FETCHING = 'post lists is fetching';
export const POST_LISTS_FAILED = 'post lists is failed';
export const POST_LISTS_COMPLETED = 'posts create completed';

export const POST_LISTS = 'posts lists';

export function createPost(post, uid) {
    return (dispatch, getState) => {
        dispatch({type: POST_CREATE_FETCHING});
        PostApi.createPost(post, getState().auth.authenticated.user.uid).then((post, id)=> {
            dispatch({type: POST_CREATE_COMPLETED, post, id});
        }).catch(error => {
            dispatch({type: POST_CREATE_FAILED, error: 'Failed'})
        });
    }
}

export function getPostLists() {
    return (dispatch, getState) => {
        dispatch({type: POST_LISTS_FETCHING});
        PostApi.getPostLists().then(posts => {
            dispatch({type: POST_LISTS_COMPLETED, payload: {posts}})
        }).catch(error => {
            dispatch({type: POST_LISTS_FAILED, error: error});
        })
    }
}