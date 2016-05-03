import React,{PropTypes} from 'react';
import {Form, Button, Grid, Col} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {authRegister} from '../../../redux/actions/AuthAction';
import {InputText} from '../../form/index';


export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    onSubmit(e){
        const {email, password, re_password} = this.props.fields;
        this.props.actionRegister(email.value, password.value);
    }

    render() {
        const {guest, registerStatus, resetForm, handleSubmit, submitting } = this.props;
        const {email, password, re_password} = this.props.fields;

        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <InputText type="text" title="Email" placeholder="Email" {...email}/>
                        <InputText type="password" title="Password" placeholder="Password" {...password}/>
                        <InputText type="password" title="Re password" placeholder="Re password" {...re_password}/>
                        {registerStatus.isFetching && 'is loading'}
                        {registerStatus.error && !registerStatus.isFetching && registerStatus.error}
                        <button className="btn btn-primary" disabled={submitting}>Submit</button>
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

