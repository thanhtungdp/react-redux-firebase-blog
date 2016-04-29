import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import AppMaster from '../components/layouts/master/AppMaster';

import LoginContainer from '../redux/containers/LoginContainer';
import RegisterContainer from '../redux/containers/RegisterContainer';
import ProfileContainer from '../redux/containers/ProfileContainer';


import Logout from '../components/pages/member/Logout';
import ProtectedPage from '../components/pages/ProtectedPage';
import HomePage from '../components/pages/HomePage';
import {redirectIfGuest, redirectIfAuthenticated} from '../redux/containers/requireAuth';

import React from 'react';

export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <IndexRoute component={HomePage} />
            <Route path="/register" component={redirectIfAuthenticated(RegisterContainer)}/>
            <Route path="/profile" component={redirectIfGuest(ProfileContainer)}/>
            <Route path="/login" component={redirectIfAuthenticated(LoginContainer)}/>
            <Route path="/logout" component={redirectIfGuest(Logout,'/login')}/>
            <Route path="/protected-page" component={redirectIfGuest(ProtectedPage)}/>
        </Route>
    )
}