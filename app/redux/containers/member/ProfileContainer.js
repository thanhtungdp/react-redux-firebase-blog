import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {updateProfile, getProfile} from '../../actions/AuthAction';
import Profile from '../../../components/pages/member/Profile';

const mapStateToProps = (state, ownProps)=> {
    return {
        initialValues: state.auth.authenticated.profile.payload,
        updateFetching: state.auth.profile.isFetching,
        updateError: state.auth.profile.error,
        getFetching: state.auth.authenticated.profile.isFetching,
        getError: state.auth.authenticated.profile.error
    }
}

const mapDispatchToProps = (dispatch, state)=> {
    return bindActionCreators({updateProfile, getProfile}, dispatch);
}

export default reduxForm({
    form: 'initializing',
    fields: ['first_name', 'last_name', 'description']
}, mapStateToProps, mapDispatchToProps)(Profile);

