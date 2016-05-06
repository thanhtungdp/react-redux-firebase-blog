import React,{Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import ValidateWrapControl from './ValidateWrapControl';
import EditorRich from './Editor/index';
import validator from 'validator';

export default class EditorRich extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ValidateWrapControl {...this.props}>
                <EditorRich {...this.props}/>
            </ValidateWrapControl>
        )
    }
}

