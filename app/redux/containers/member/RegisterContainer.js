import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import validator from 'validator';
import Register from '../../../components/pages/member/Register';
import {authRegister} from '../../actions/AuthAction';

const fields = ['email', 'password', 're_password'];

const validate = values => {
    const errors = {};
    const {email, password, re_password} = values;
    if (!email) {
        errors.email = 'Required';
    } else if (!validator.isEmail(email)) {
        errors.email = 'Not valid email';
    }
    ;

    if (!password) {
        errors.password = 'Required';
    }
    else if (!validator.isLength(password,{min: 6})) {
        errors.password = 'Password min length 6'
    }

    if (!re_password) {
        errors.re_password = 'Please rep assword';
    }
    else if (re_password != password) {
        errors.re_password = 'Password not correct';
    }
    return errors;
}

const mapStateToProps = (state)=> {
    return {
        registerStatus: state.auth.register,
        guest:state.auth.authenticated.guest
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({actionRegister: authRegister}, dispatch)
}

export default reduxForm({
    form: 'formRegister',
    fields,
    validate
},mapStateToProps, mapDispatchToProps)(Register);