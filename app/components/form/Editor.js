import React,{Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import HigherControl from './HigherControl';
import EditorRich from './Editor/index';
import validator from 'validator';

export default class EditorRich extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HigherControl {...this.props}>
                <EditorRich {...this.props}/>
            </HigherControl>
        )
    }
}

