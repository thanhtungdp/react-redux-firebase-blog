import React from 'react';
import Register from '../../components/pages/member/Register';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authRegister} from '../actions/AuthAction';

class RegisterContainer extends React.Component {
    render() {
        return (
            <div>
                <Register actionRegister={this.props.actions.actionRegister} registerStatus={this.props.registerStatus}
                          guest={this.props.guest}/>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        registerStatus: state.auth.register,
        guest:state.auth.authenticated.guest
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        actions: bindActionCreators({actionRegister: authRegister}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);