import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import AppMaster from '../views/AppMaster';
import Photo from '../components/Photo';
import SearchApp from '../containers/SearchApp';

export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <Route path="/search(/:search)" component={SearchApp}></Route>
        </Route>
    )
}