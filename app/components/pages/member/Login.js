import React,{PropTypes} from 'react';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import Validator from 'validator';
import {InputText} from '../../form/index';

export default class Login extends React.Component {
    onSubmit() {
        this.props.actionLogin(this.props.fields.email.value, this.props.fields.password.value);
    }

    render() {
        let {fields:{email, password}, guest, loginStatus, handleSubmit} = this.props;
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <InputText title="Email" type="text" {...email}/>
                        <InputText title="Password" type="password" {...password}/>
                        {loginStatus.isFetching && <div>Is loging ...</div>}
                        {loginStatus.error && <div>{loginStatus.error}</div>}
                        <Button bsStyle="primary" type="submit" disabled={loginStatus.isFetching}>Login</Button>
                    </form>
                </Col>
            </Grid>
        )
    }
}

Login.propTypes = {
    actionLogin: PropTypes.func.isRequired,
    loginStatus: PropTypes.object.isRequired,
    guest: PropTypes.bool
}
