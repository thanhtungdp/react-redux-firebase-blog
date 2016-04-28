import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import AppMaster from '../views/AppMaster';

import LoginContainer from '../redux/containers/LoginContainer';
import RegisterContainer from '../redux/containers/RegisterContainer';
import ProfileContainer from '../redux/containers/ProfileContainer';


import Logout from '../components/pages/member/Logout';
import ProtectedPage from '../views/ProtectedPage'
import {redirectIfGuest, redirectIfAuthenticated} from '../redux/containers/requireAuth';

import React from 'react';

export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <Route path="/register" component={redirectIfAuthenticated(RegisterContainer)}/>
            <Route path="/profile" component={redirectIfGuest(ProfileContainer)}/>
            <Route path="/login" component={redirectIfAuthenticated(LoginContainer)}/>
            <Route path="/logout" component={redirectIfGuest(Logout,'/login')}/>
            <Route path="/protected-page" component={redirectIfGuest(ProtectedPage)}/>
        </Route>
    )
}