import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {reduxForm} from 'redux-form';
import PostForm from '../../../components/pages/posts/PostForm';
import {createPost} from '../../actions/PostAction';


const mapStateToProps = (state, ownProps)=> {
    return {
        isFetching: state.posts.create.isFetching,
        error: state.posts.create.error,
        completed: state.posts.create.completed
    }
}

const mapDispatchToProps = (dispatch, state)=> {
    return bindActionCreators({updatePost: createPost}, dispatch);

}

const validate = (values) => {
    let errors = {};
    fields.map((field) => {
        if (!values[field]) {
            errors[field] = `${field} is required`;
        }
    });
    return errors;
}

const fields = ['title', 'description', 'content'];

export default reduxForm({
    form: 'CreatePost',
    fields,
    validate
}, mapStateToProps, mapDispatchToProps)(PostForm);