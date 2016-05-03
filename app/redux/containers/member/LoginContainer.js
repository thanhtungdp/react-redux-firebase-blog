import React from 'react';
import Login from '../../../components/pages/member/Login';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {authLogin} from '../../actions/AuthAction';
import {reduxForm} from 'redux-form';
import validator from 'validator';

const fields = ['email', 'password'];

const validate = (values) => {
    const {email, password} = values;
    const errors = {};

    if(!email) errors.email = 'Required';
    else if(!validator.isEmail(email)) errors.email = 'Not valid email';

    if(!password) errors.password = 'Required';

    return errors;
}

const mapStateToProps = (state)=> {
    return {
        guest: state.auth.authenticated.guest,
        loginStatus: state.auth.login
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({actionLogin: authLogin}, dispatch);
}

export default reduxForm({
    form: 'Login',
    fields,
    validate
}, mapStateToProps, mapDispatchToProps)(Login);
