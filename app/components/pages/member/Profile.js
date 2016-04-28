import React, {Component, PropTypes} from 'react';
import InputText from '../../form/InputText';
import {Grid,Col,Button} from 'react-bootstrap';

export default class Profile extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            form: {
                first_name: {
                    value: '',
                    isValidate: false
                },
                last_name: {
                    value: '',
                    isValidate: true
                }
            }
        }
    }

    onSumbit(e) {
        console.log('submit');
        let profile = {
            first_name: this.state.form.first_name.value,
            last_name: this.state.form.last_name.value
        }
        this.props.updateProfile(profile);

        e.preventDefault();
    }

    updateInput(key, value, isValidate) {
        let form = Object.assign({}, this.state.form, {[key]: {value: value, isValidate}});
        this.setState({form: form});
        /*if (this.checkValidateForm(form)) {
            this.setState({warning: false});
        }*/
    }

    render() {
        const {first_name, last_name} = this.props.profile;
        const {isFetching, error} = this.props.profileStatus;
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    <form onSummit={this.onSumbit.bind(this)}>
                        <InputText title="First name" placeholder="First name" value={first_name}
                                   onChange={this.updateInput.bind(this,'first_name')}/>
                        <InputText title="Last name" placeholder="Last name" name={last_name}/>
                        {isFetching && <p>Updating</p>}
                        {error && <p>Error</p>}
                        <Button bsStyle="primary" type="submit" onClick={this.onSumbit.bind(this)}>Update</Button>
                    </form>
                </Col>
            </Grid>
        )
    }
}

Profile.propTypes = {}