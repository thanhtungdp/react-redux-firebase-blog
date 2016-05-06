import {AWAIT_MARKER} from 'redux-await';
import PostApi from '../../api/post/index';
import {postsList} from '../../configs/index';

export const POST_CREATE = 'post create';
export const POST_UPDATE = 'post update';
export const POST_LISTS = 'posts lists';
export const POST_LISTS_LOAD_MORE = 'post load more';
export const POST_VIEW = 'post view';
export const POST_EDIT = 'post edit';
export const POST_DELETE = 'post delete';
export const POST_RESET = 'post reset';

export function createPost(post) {
    return (dispatch, getState)=> {
        dispatch({
            type: POST_CREATE,
            AWAIT_MARKER,
            payload: {
                createPost: PostApi.createPost(post, getState().auth.authenticated.user.uid)
            }
        });
    }
}

export function updatePost(post, post_id) {
    return (dispatch) => {
        dispatch({
            type: POST_UPDATE,
            AWAIT_MARKER,
            payload: {
                updatePost: PostApi.updatePost(post, post_id)
            }
        })
    }
}

export function getPostsList() {
    return (dispatch) => {
        dispatch({
            type: POST_LISTS,
            AWAIT_MARKER,
            payload: {
                getPosts: PostApi.getPostsList()
            }
        });
    }
}

export function getPostView(id) {
    return (dispatch) => {
        dispatch({
            type: POST_VIEW,
            AWAIT_MARKER,
            payload: {
                getPost: PostApi.getPost(id)
            }
        })
    }
}

export function deletePost(id){
    return (dispatch) => {
        dispatch({
            type: POST_DELETE,
            AWAIT_MARKER,
            payload: {
                deletePost: PostApi.deletePost(id)
            }
        })
    }
}

export function loadMorePosts(loadMore = postsList.perPage){
    return (dispatch) => {
        dispatch({
            type: POST_LISTS_LOAD_MORE,
            loadMore: loadMore
        })
    }
}

export function resetCurrentPost(){
    return (dispatch) => {
        dispatch({
            type: POST_RESET
        })
    }
}

//export function getPostsList() {
//    return (dispatch, getState) => {
//        dispatch({type: POST_LISTS_FETCHING});
//        PostApi.getPostsList().then(posts => {
//            dispatch({type: POST_LISTS_COMPLETED, payload: {posts}})
//        }).catch(error => {
//            dispatch({type: POST_LISTS_FAILED, error: error});
//        })
//    }
//}