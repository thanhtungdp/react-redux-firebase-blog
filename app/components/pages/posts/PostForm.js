import React, {Component, PropTypes} from 'react';
import {Grid, Col, Button} from 'react-bootstrap';
import {InputText, Textarea, Editors, Loading, ValidateWrapControl, WrapContainer} from '../../form/index';
import {Link} from 'react-router';

export default class PostForm extends Component {
    onSubmit() {
        let post = {
            title: this.props.fields.title.value,
            description: this.props.fields.description.value,
            content: this.props.fields.content.value
        }

        this.props.onSubmit(post);
    }

    render() {
        const {fields: {title, description, content}, awaitStatuses, formType, handleSubmit, submitting} = this.props;
        return (
            <WrapContainer animateIn="fadeIn">
                <div className="clearfix">
                    <h1 className="title pull-left">
                        {this.props.formType == 'edit' ? 'Edit Post' : 'New Post'}
                        {' '}
                    </h1>
                    <div className="tools pull-right">
                        {this.props.formType == 'edit' &&
                        <div>
                            <Link to={`posts/${this.props.post_id}`} className="btn btn-blue">View</Link> {' '}
                            <Button bsStyle="orange" type="submit"
                                    disabled={submitting} onClick={this.props.onDelete}><i className="icon-trash"/>
                                Delete</Button>
                        </div>
                        }
                    </div>
                </div>

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="form">
                    <InputText type="text" title="Title" {...title}/>
                    <Textarea title="Descritpion" {...description} />
                    <ValidateWrapControl title="Content" {...content}>
                        {formType == 'edit' && content.value &&
                        <Editors.EditorRich {...content} defaultContentState={content.value ? content.value : {}}/>
                        }
                        {formType == 'create' &&
                        <Editors.EditorRich {...content}/>
                        }
                    </ValidateWrapControl>

                    {formType == 'edit' ?
                        (awaitStatuses.updatePost == 'pending' ? <Loading text="Post is updating"/> : null) :
                        (awaitStatuses.createPost == 'pending' ? <Loading text="Post is creating"/> : null)
                    }
                    {awaitStatuses.deletePost == 'pending' &&
                        <Loading text="Post is deleting"/>
                    }
                    {awaitStatuses.getPost == 'pending' && <Loading text="Post is loading"/>}
                    {formType == 'edit' ?
                        <div>
                            <Button bsStyle="red" className="pull-right" type="submit"
                                    disabled={submitting}>Update</Button>
                        </div> :
                        <Button bsStyle="red" className="pull-right" type="submit" disabled={submitting}>Create</Button>
                    }

                </form>
            </WrapContainer>
        )
    }
}

PostForm.propTypes = {
    formType: PropTypes.oneOf(['create', 'edit']),
    post_id: PropTypes.string,
    fields: PropTypes.shape({
        title: PropTypes.object,
        description: PropTypes.object,
        content: PropTypes.object
    }),
    awaitStatuses: PropTypes.shape({
        createPost: PropTypes.string,
        updatePost: PropTypes.string,
        deletePost: PropTypes.string
    }),
    awaitErrors: PropTypes.shape({
        createPost: PropTypes.string,
        updatePost: PropTypes.string,
        deletePost: PropTypes.string
    }),
    onSubmit: PropTypes.func,
    onDelete: PropTypes.func,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool
}