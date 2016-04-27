import React,{PropTypes} from 'react';
import Auth from '../../../api/auth/index'
import InputText from '../../form/InputText';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import Validator from 'validator';

export default class Login extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        this.props.actionLogin(this.state.email, this.state.password);
    }

    updateInput(key, value) {
        this.setState({[key]: value});
    }

    render() {
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <InputText title="Email" type="email" onChange={this.updateInput.bind(this,'email')}/>
                        <InputText title="Password" type="password" onChange={this.updateInput.bind(this,'password')}/>
                        {this.props.auth.isFetching && <div>Is loging ...</div>}
                        {this.props.auth.error && <div>{this.props.auth.error}</div>}
                        {this.props.auth.isAuthenticated && <div className="alert alert-success">
                            Login success
                        </div>}
                        <Button bsStyle="primary" type="submit">Login</Button>
                    </form>
                </Col>
            </Grid>
        )
    }
}

Login.propTypes = {
    actionLogin: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
}