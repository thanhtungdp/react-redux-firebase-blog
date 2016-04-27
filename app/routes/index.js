import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import AppMaster from '../views/AppMaster';
import Register from '../components/pages/member/Register';
import LoginContainer from '../redux/containers/LoginContainer';
import Logout from '../components/pages/member/Logout';
import ProtectedPage from '../views/ProtectedPage'
import {redirectIfNotAuthenticated, redirectIfAuthenticated} from '../redux/containers/requireAuth';

import React from 'react';

export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <Route path="/register" component={redirectIfNotAuthenticated(Register)}/>
            <Route path="/login" component={redirectIfAuthenticated(LoginContainer)}/>
            <Route path="/logout" component={redirectIfNotAuthenticated(Logout,'/login')}/>
            <Route path="/protected-page" component={redirectIfNotAuthenticated(ProtectedPage)}/>
        </Route>
    )
}