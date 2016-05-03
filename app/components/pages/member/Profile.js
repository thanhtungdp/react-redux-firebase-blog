import React, {Component, PropTypes} from 'react';
import {Grid,Col,Button} from 'react-bootstrap';
import {InputText, Textarea} from '../../form/index';

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
        this.props.updateProfile(profile);
    }

    componentDidMount() {
        this.props.getProfile();
    }

    render() {
        const {fields:{first_name, last_name, description}, handleSubmit} = this.props;
        return (
            <Grid>
                <Col md={6} mdOffset={3}>
                    {this.props.getFetching && <p>Is loading ...</p>}
                    {!this.props.getFetching &&
                    <form onSubmit={handleSubmit(this.onSumbit.bind(this))}>
                        <InputText title="First name" placeholder="First name" {...first_name}/>
                        <InputText title="Last name" placeholder="Last name" {...last_name}/>
                        <Textarea title="Description" placeholder="Description" {...description}/>
                        {this.props.updateFetching && <p>Updating</p>}
                        {this.props.updateError && <p>Error</p>}
                        <Button bsStyle="primary" type="submit">Update</Button>
                    </form>
                    }
                </Col>
            </Grid>
        )
    }
}

Profile.propTypes = {}