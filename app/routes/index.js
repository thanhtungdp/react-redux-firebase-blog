import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import AppMaster from '../components/layouts/master/AppMaster';

import {LoginContainer, ProfileContainer, RegisterContainer} from '../redux/containers/member/index';
import {CreatePostContainer, PostListsContainer} from '../redux/containers/posts/index';

import Logout from '../components/pages/member/Logout';
import ProtectedPage from '../components/pages/ProtectedPage';
import HomePage from '../components/pages/HomePage';
import {redirectIfGuest, redirectIfAuthenticated} from '../redux/containers/requireAuth';


export default () => {
    return (
        <Route path="/" component={AppMaster}>
            <IndexRoute component={HomePage}/>
            <Route path="/auth">
                <Route path="register" component={redirectIfAuthenticated(RegisterContainer)}/>
                <Route path="profile" component={redirectIfGuest(ProfileContainer)}/>
                <Route path="login" component={redirectIfAuthenticated(LoginContainer)}/>
                <Route path="logout" component={redirectIfGuest(Logout,'/auth/login')}/>
            </Route>
            <Route path="/posts">
                <IndexRoute component={PostListsContainer}/>
                <Route path="create" component={redirectIfGuest(CreatePostContainer)}/>
            </Route>
            <Route path="/protected-page" component={redirectIfGuest(ProtectedPage)}/>
        </Route>
    )
}