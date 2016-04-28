import React from 'react';
import Login from '../../components/pages/member/Login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authLogin} from '../actions/AuthAction';

class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                <Login actionLogin={this.props.actions.actionLogin} guest={this.props.guest} loginStatus={this.props.loginStatus} />
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        guest: state.auth.authenticated.guest,
        loginStatus: state.auth.login
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({actionLogin: authLogin}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);