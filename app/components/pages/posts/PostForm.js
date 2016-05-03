import React, {Component} from 'react';
import {Grid, Col, Button} from 'react-bootstrap';
import {InputText, Textarea, Editors, ValidateWrapControl} from '../../form/index';
import EditorBlank from '../../form/Editor/EditorBlank';


export default class PostForm extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            form: {
                content: {}
            }
        }
    }

    onSubmit() {
        let rawContent ='raw content';

        let post = {
            title: this.props.fields.title.value,
            description: this.props.fields.description.value,
            content: this.props.fields.content.value
        }
        console.log(this.props.fields.content.value);
        this.props.updatePost(post);
    }

    handleFormContent(contentState) {
        let form = ([
            ...this.state.form,
            {
                content: contentState
            }
        ]);
        this.setState({form});
    }

    render() {
        const {fields: {title, description, content}, handleSubmit} = this.props;
        return (
            <Grid>
                <Col md={8} mdOffset={2}>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <InputText type="text" title="Title" {...title}/>
                        <Textarea title="Descritpion" {...description} />
                        <ValidateWrapControl title="Content" {...content}>
                            <Editors.EditorRich  {...content}/>
                        </ValidateWrapControl>
                    {this.props.isFetching && <p>Is fetcing</p>}
                    {this.props.completed && <p>Completed</p>}
                    <Button bsStyle="primary" type="submit">Create</Button>
                </form>
            </Col>
    </Grid>
    )
    }
}