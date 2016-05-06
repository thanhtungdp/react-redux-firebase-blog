import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {pushState, hashHistory} from 'react-router';
import {checkToken} from '../actions/AuthAction';
import Auth from '../../api/auth/index';

export const REDIRECT_IF_GUEST = 'redirect if guest';
export const REDIRECT_IF_AUTHENTICATED = 'redirect if authenticated';

/**
 * Require auth (redirect if authenticated, or not authenticated)
 * @param Component | React Component
 * @param redirectIfNotAuthenticated | = true => redirect if not auth | false => redirect if atuh
 * @param redirect | link redirect if not match Authenticated check
 * @returns {*}
 */
export function requireAuth(Component, redirectCheck = REDIRECT_IF_GUEST, redirect = '/auth/login') {
    class AuthenticatedComponent extends React.Component {
        constructor() {
            super(...arguments);
            this.checkTokenInterval = '';
        }

        checkAuth(guest) {
            switch (redirectCheck) {
                case REDIRECT_IF_GUEST:
                    if (guest) {
                        let redirectAfterLogin = this.props.location.pathname;
                        hashHistory.push(`${redirect}?next=${redirectAfterLogin}`);
                    }
                    break;
                case REDIRECT_IF_AUTHENTICATED:
                    if (!guest) {
                        let nextUrl = this.props.location.query.next;
                        if (nextUrl) {
                            redirect = nextUrl;
                        }
                        hashHistory.push(redirect);
                    }
            }
        }

        componentDidUpdate() {
            this.checkAuth(this.props.guest);
        }

        componentDidMount() {
            this.checkAuth(this.props.guest);
        }

        render() {
            let component;
            switch (redirectCheck) {
                case REDIRECT_IF_GUEST:
                    component = !this.props.guest ? <Component {...this.props}/> : null;
                    break;
                case REDIRECT_IF_AUTHENTICATED:
                    component = this.props.guest ? <Component {...this.props}/> : null;
                    break;
            }
            return (
                <div>
                    {component}
                </div>
            )
        }
    }

    const mapStateToProps = (state)=>({
        guest: state.auth.authenticated.guest
    });

    const mapDispatchToProps = (dispatch)=>({
        actions: bindActionCreators({checkToken: checkToken}, dispatch)
    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}

export function redirectIfGuest(Component, redirect = "/auth/login") {
    return requireAuth(Component, REDIRECT_IF_GUEST, redirect)
}

export function redirectIfAuthenticated(Component, redirect = "/") {
    return requireAuth(Component, REDIRECT_IF_AUTHENTICATED, redirect);
}
