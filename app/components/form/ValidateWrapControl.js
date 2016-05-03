import React,{Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

export default class HigherControl extends Component {
    constructor() {
        super(...arguments)
    }

    render() {
        const {title, touched, error} = this.props;
        const status = (touched && error) ? 'error' : null;

        return (
            <FormGroup validationState={status}>
                {title && <ControlLabel>{title}</ControlLabel>}
                {this.props.children}
                {touched && error && <p>{error}</p>}
            </FormGroup>
        )
    }
}

HigherControl.propTypes = {
    title: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string
}