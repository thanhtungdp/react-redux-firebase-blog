import React, {Component, PropTypes} from 'react';
import {Grid,Col,Button} from 'react-bootstrap';
import {InputText, Textarea, WrapContainer, Loading} from '../../form/index';

export default class Profile extends Component {

    constructor() {
        super(...arguments);
    }

    onSumbit() {
        let profile = {
            first_name: this.props.fields.first_name.value,
            last_name: this.props.fields.last_name.value,
            description: this.props.fields.description.value
        }
        this.props.onSubmit(profile);
    }

    render() {
        const {fields:{first_name, last_name, description}, handleSubmit, awaitStatuses} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                <h1 className="title">Profile</h1>
                {awaitStatuses.getProfile == 'pending' && <Loading text="Profile is loading"/>}
                {awaitStatuses.getProfile == 'success' &&
                <form className="form" onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                    <InputText title="First name" placeholder="First name" {...first_name}/>
                    <InputText title="Last name" placeholder="Last name" {...last_name}/>
                    <Textarea title="Description" placeholder="Description" {...description}/>
                    <Button bsStyle="red" className="pull-right" type="submit">Update</Button>
                </form>
                }
                {awaitStatuses.updateProfile == 'pending' && <Loading text="Profile is updating ..."/>}
            </WrapContainer>
        )
    }
}

Profile.propTypes = {
    fields: PropTypes.object.isRequired,
    awaitStatuses: PropTypes.shape({
        getProfile: PropTypes.string,
        updateProfile: PropTypes.string
    }),
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}