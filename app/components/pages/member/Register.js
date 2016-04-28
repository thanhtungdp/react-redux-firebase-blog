import React,{PropTypes} from 'react';
import InputText from '../../form/InputText';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import validator from 'validator';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: {
                    value: '',
                    isValidate: false
                },
                password: {
                    value: '',
                    isValidate: false,
                },
                re_password: {
                    value: '',
                    isValidate: false
                }
            },
            warning: false
        }
    }

    checkValidateForm(form) {
        for (let key in form) {
            if (!form[key].isValidate) return false;
        }
        return true;
    }

    updateInput(key, value, isValidate) {
        let form = Object.assign({}, this.state.form, {[key]: {value: value, isValidate}});
        this.setState({form: form});
        if (this.checkValidateForm(form)) {
            this.setState({warning: false});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.checkValidateForm(this.state.form)) {
            this.setState({warning: false});
            this.props.actionRegister(this.state.form.email.value, this.state.form.password.value);
        } else {
            this.setState({warning: true});
        }
    }

    componentDidUpdate() {
    }

    render() {
        const {guest, registerStatus} = this.props;
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <InputText title="Email" type="email" validator={validator.isEmail}
                                   onChange={this.updateInput.bind(this,'email')}/>
                        <InputText title="Password" type="password"
                                   validator={validator.isLength}
                                   optionValidator={[{min: 6}]} onChange={this.updateInput.bind(this,'password')}/>
                        <InputText title="Re password" type="password"
                                   validators={[validator.isLength,validator.equals]}
                                   optionValidators={[[{min: 6}],[this.state.password]]}
                                   onChange={this.updateInput.bind(this,'re_password')}
                        />
                        {this.state.warning && <p className="text-warning">Please complete form</p>}
                        {registerStatus.isFetching && <p>Is fetching</p>}
                        {registerStatus.error && <p>{registerStatus.error}</p>}
                        <Button bsStyle="primary" type="submit">Register</Button>
                    </form>
                </Col>
            </Grid>
        )
    }
}

Register.propTypes = {
    actionRegister: PropTypes.func.isRequired,
    registerStatus: PropTypes.object.isRequired,
    guest: PropTypes.bool,
}