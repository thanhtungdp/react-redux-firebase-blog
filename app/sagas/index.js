import {take, put, call, fork, select} from 'redux-saga/effects'
import * as actions from '../actions/SearchActions'
import 'whatwg-fetch'

function fetchPhotoSearchApi(keyword, page=1, callback){
    fetch(`https://api.500px.com/v1/photos/search?term=${keyword}&page=${page}&rpp=20&image_size=440&sort=highest_rating&consumer_key=sPvXEpW2sFrch65rpyZQf01lBHuRGkEDDROTG1r4`)
        .then(response => response.json())
        .then(json => json.data.children.map(child => child.data) )
        .catch(error => console.log(error))
}

function* fetchPhotoSearch(keyword, page = 1){
    yield put(actions.searchPending(keyword));
    const photos = yield call(fetchPhotoSearch, keyword, page)
    yield put(actions.searchDone(keyword, photos, page));
}