import React,{PropTypes} from 'react';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import {InputText, WrapContainer, Loading} from '../../form/index';

export default class Login extends React.Component {
    onSubmit() {
        this.props.onSubmit(this.props.fields.email.value, this.props.fields.password.value);
    }

    render() {
        let {fields:{email, password},awaitStatuses, awaitErrors, handleSubmit} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                <Col md={8} mdOffset={2}>
                    <h1 className="title">Login</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form">
                        <InputText title="Email" type="text" {...email}/>
                        <InputText title="Password" type="password" {...password}/>
                        {awaitStatuses.userLogin == 'pending' && <Loading text="User is checking"/>}
                        {awaitErrors.userLogin && <div>{awaitErrors.userLogin}</div>}
                        <Button bsStyle="red" type="submit"
                                disabled={awaitStatuses.userLogin == 'pending'} className="pull-right">Login</Button>
                    </form>
                </Col>
            </WrapContainer>
        )
    }
}

Login.propTypes = {
    fields: PropTypes.object.isRequired,
    awaitStatuses: PropTypes.shape({
        userLogin: PropTypes.string
    }),
    awaitErrors: PropTypes.shape({
        userLogin: PropTypes.string
    }),
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}
