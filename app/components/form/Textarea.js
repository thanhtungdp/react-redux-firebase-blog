import React,{Component, PropTypes} from 'react';
import ValidateWrapControl from './ValidateWrapControl';
import {FormControl} from 'react-bootstrap';

export default class Textarea extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <FormControl componentClass="textarea" {...this.props}/>
            </ValidateWrapControl>
        )
    }
}

