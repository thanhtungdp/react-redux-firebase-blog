import React from 'react';
import InputText from '../../form/InputText';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import validator from 'validator';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            re_password: ''
        }
    }

    updateInput(key, value) {
        this.setState({[key]: value});
        console.log(this.state);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <InputText title="Email" type="email"  validator={validator.isEmail} onChange={this.updateInput.bind(this,'email')}/>
                        <InputText title="Password" type="password" validator={validator.isLength}
                                   optionValidator={[{min: 6}]} onChange={this.updateInput.bind(this,'password')}/>
                        <InputText title="Re password" type="password" validator={validator.equals} optionValidate={[this.state.password]}/>
                        <Button bsStyle="primary" type="submit">Register</Button>
                    </form>
                </Col>
            </Grid>
        )
    }
}