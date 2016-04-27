import React from 'react';
import {connect} from 'react-redux';
import {pushState, hashHistory} from 'react-router';
import {isAuthenticated} from '../actions/AuthAction';
import Auth from '../../api/auth/index';

export function requireAuth(Component, notAuthenticated = true, redirect = '/login') {
    class AuthenticatedComponent extends React.Component {
        constructor() {
            super(...arguments);
        }

        checkAuth(isAuthenticated) {
            if (notAuthenticated) {
                // Redirect if not authoried
                if (!isAuthenticated) {
                    let redirectAfterLogin = this.props.location.pathname;
                    hashHistory.push(`${redirect}?next=${redirectAfterLogin}`);
                }
            }
            else {
                // redirect if authorized
                if (isAuthenticated) {
                    console.log(this.props);
                    let nextUrl = this.props.location.query.next;
                    if (nextUrl) {
                        redirect = nextUrl;
                    }
                    hashHistory.push(redirect);
                }
            }
        }

        componentWillMount() {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentDidUpdate() {
            this.checkAuth(this.props.isAuthenticated);
        }

        render() {
            let component;
            if (notAuthenticated) {
                component = this.props.isAuthenticated ? <Component {...this.props}/> : null;
            }
            else {
                component = !this.props.isAuthenticated ? <Component {...this.props}/> : null
            }
            return (
                <div>
                    {component}
                </div>
            )
        }
    }

    const mapStateToProps = (state)=>({
        isAuthenticated: state.auth.isAuthenticated,
    });

    return connect(mapStateToProps)(AuthenticatedComponent);
}

export function redirectIfNotAuthenticated(Component, redirect = "/login") {
    return requireAuth(Component, true, redirect)
}

export function redirectIfAuthenticated(Component, redirect = "/") {
    return requireAuth(Component, false, redirect);
}