import React from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import validator from 'validator';
import Register from '../../../components/pages/member/Register';
import {authRegister, authLogin} from '../../actions/AuthAction';
import {setTitle, reduxAwait} from '../../../utils/index';

class RegisterContainer extends React.Component {
    onSubmit(...args) {
        this.props.authRegister(...args);
    }

    componentDidUpdate() {
        const {awaitStatuses, registerForm: {email, password}} = this.props;
        if (awaitStatuses.userRegister == 'success' && awaitStatuses.userLogin != 'pending') {
            this.props.authLogin(email, password);
        }
    }

    componentDidMount(){
        setTitle('Register');
    }

    render() {
        return (
            <Register {...this.props} onSubmit={this.onSubmit.bind(this)}/>
        )
    }
}

const fields = ['email', 'first_name', 'last_name', 'password', 're_password'];

const validate = values => {
    const errors = {};
    const {email, password, re_password, first_name, last_name} = values;

    fields.map((field) => {
        if (!values[field]) {
            errors[field] = `Required`;
        }
        else {
            switch (field) {
                case 'email':
                    if (!validator.isEmail(email)) {
                        errors.email = 'Not valid email';
                    }
                    ;
                    break;
                case 'first_name':
                    if (!validator.isAlpha(first_name)) {
                        errors.first_name = 'First name only string';
                    }
                    break;
                case 'last_name':
                    if (!validator.isAlpha(last_name)) {
                        errors.last_name = 'Last name only string';
                    }
                    break;
                case 'password':
                    if (!validator.isLength(password, {min: 6})) {
                        errors.password = 'Password\'s min length 6'
                    }
                    break;
                case 're_password':
                    if (re_password != password) {
                        errors.re_password = 'Password\' not correct';
                    }
                    break;
            }
        }
    });
    return errors;
}

const mapStateToProps = (state)=> {
    return {
        registerForm: state.auth.register,
        guest: state.auth.authenticated.guest,
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({authRegister, authLogin}, dispatch)
}

let registerForm = reduxForm({
    form: 'formRegister',
    fields,
    validate
})(RegisterContainer);

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(registerForm);