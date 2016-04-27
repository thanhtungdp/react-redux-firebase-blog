import photoSearch from '../api/PhotoSearch';

export const SEARCH_PENDING = 'SEARCH_PENDING';
export const SEARCH_PENDING_FOR_NEXT = 'SEARCH_PENDING_FOR_TEXT';
export const SEARCH_DONE = 'SEARCH_DONE';
export const IDLE = 'IDLE';
export const IDEA2 = 'ABC';

export function searchPendingNext(page) {
    return {
        type: SEARCH_PENDING_FOR_NEXT
    }
}

export function searchPending(keyword) {
    return {
        type: SEARCH_PENDING
    }
}

export function searchDone(keyword, photos, page) {
    return {
        type: SEARCH_DONE,
        keyword,
        photos,
        page
    }
}

function searchWithPhotoAPI(keyword, page, dispatch) {
    if (page >= 2) {
        dispatch(searchPendingNext());
    }
    else {
        dispatch(searchPending());
    }

    photoSearch(keyword, page).then((data)=> {
        dispatch(searchDone(keyword, data.photos, page));
    });
}

export function searchNextPageAction() {
    return (dispatch, getState) => {
        const page = getState().photos.page + 1;
        const keyword = getState().photos.keyword;
        searchWithPhotoAPI(keyword, page, dispatch);
    }
}

export function searchPhotoAction(keyword, page = 1) {
    return (dispatch)=> {
        searchWithPhotoAPI(keyword, page, dispatch);
    }
}