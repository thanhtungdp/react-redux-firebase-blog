import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {Router, Route, hashHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Routes from '../routes/index';

const store = configureStore();

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router onUpdate={() => window.scrollTo(0, 0)} history={hashHistory}>
                    {Routes()}
                </Router>
            </Provider>
        )
    }
}
