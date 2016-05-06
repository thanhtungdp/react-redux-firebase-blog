// Packages
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import validator from 'validator';

//Components
import {setTitle, reduxAwait} from '../../../utils/index';
import {updateProfile, getProfile} from '../../actions/AuthAction';
import {resetAwait} from '../../actions/AwaitAction';
import Profile from '../../../components/pages/member/Profile';

class ProfileContainer extends Component {
    componentDidMount() {
        this.props.getProfile();
        this.props.resetAwait(['updateProfile']);
        setTitle('My profile');
    }

    render() {
        return (
            <Profile {...this.props} onSubmit={this.props.updateProfile}/>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        initialValues: state.auth.authenticated.profile
    }
}

const mapDispatchToProps = (dispatch)=> {
    return bindActionCreators({updateProfile, getProfile, resetAwait}, dispatch);
}

const fields = ['first_name', 'last_name', 'description'];

const validate = values => {
    const errors = {};
    const {first_name, last_name} = values;
    fields.map((field) => {
        if (!values[field]) {
            errors[field] = `Required`;
        }
        else {
            switch (field) {
                case 'first_name':
                    if (!validator.isAlpha(first_name)) {
                        errors.first_name = 'First name only string';
                    }
                    break;
                case 'last_name':
                    if (!validator.isAlpha(last_name)) {
                        errors.last_name = 'Last name only string';
                    }
                    break;
            }
        }
    });
    return errors;
}

let profileForm = reduxForm({
    form: 'initializing',
    fields,
    validate
})(ProfileContainer);

export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(profileForm)