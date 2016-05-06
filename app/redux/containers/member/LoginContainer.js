import React from 'react';
import {bindActionCreators, bindActionCreator} from 'redux';
import {reduxForm} from 'redux-form';
import validator from 'validator';
import {setTitle, reduxAwait} from '../../../utils/index';
import {authLogin} from '../../actions/AuthAction';
import Login from '../../../components/pages/member/Login';

class LoginContainer extends React.Component {
    onSubmit(...args) {
        this.props.authLogin(...args);
    }
    componentDidMount(){
        setTitle('Login');
    }
    render() {
        return (
            <Login {...this.props} onSubmit={this.onSubmit.bind(this)}/>
        )
    }
}

const fields = ['email', 'password'];

const validate = (values) => {
    const {email, password} = values;
    const errors = {};

    if (!email) errors.email = 'Required';
    else if (!validator.isEmail(email)) errors.email = 'Not valid email';

    if (!password) errors.password = 'Required';

    return errors;
}

const mapStateToProps = (state)=> {
    return {
        guest: state.auth.authenticated.guest
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({authLogin}, dispatch)
}

let LoginForm = reduxForm({
    form: 'Login',
    fields,
    validate
})(LoginContainer);

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(LoginForm);