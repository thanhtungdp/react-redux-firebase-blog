import React from 'react';
import Login from '../../components/pages/member/Login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authLogin} from '../actions/AuthAction';

class LoginContainer extends React.Component {
    render() {
        return (
            <div>
                <Login actionLogin={this.props.actions.actionLogin} auth={this.props.auth} />
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({actionLogin: authLogin}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);