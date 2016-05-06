import React,{PropTypes} from 'react';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {authRegister} from '../../../redux/actions/AuthAction';
import {InputText, WrapContainer, Loading} from '../../form/index';

export default class Register extends React.Component {
    onSubmit() {
        const {email, password, first_name, last_name} = this.props.fields;
        this.props.onSubmit(email.value, password.value, {
            first_name: first_name.value,
            last_name: last_name.value
        });
    }

    render() {
        const {awaitStatuses, awaitErrors, handleSubmit, submitting}= this.props;
        const {email, first_name, last_name, password, re_password} = this.props.fields;
        return (
            <WrapContainer animateIn="fadeIn">
                <h1 className="title"><i className="icon-user-follow"></i> Register</h1>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form">
                    <InputText type="text" title="Email" placeholder="Email" {...email}/>
                    <InputText type="text" title="First name" placeholder="First name" {...first_name}/>
                    <InputText type="text" title="Last name" placeholder="Last name" {...last_name}/>
                    <InputText type="password" title="Password" placeholder="Password" {...password}/>
                    <InputText type="password" title="Re password" placeholder="Re password" {...re_password}/>

                    {awaitStatuses.userRegister == 'pending' && <Loading text='Is register'/>}
                    {awaitStatuses.userLogin == 'pending' && <Loading text='Is Login'/>}
                    {awaitErrors.userRegister && <p>{awaitErrors.userRegister}</p>}
                    <button className="btn btn-red pull-right" disabled={submitting}>Register</button>
                </form>
            </WrapContainer>
        )
    }
}

Register.propTypes = {
    fields: PropTypes.object.isRequired,
    awaitStatuses: PropTypes.shape({
        userLogin: PropTypes.string,
        userRegister: PropTypes.string
    }).isRequired,
    awaitErrors: PropTypes.shape({
        userRegister: PropTypes.string
    }),
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

