import React,{Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import validator from 'validator';

export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', enableValidate: false}
    }

    getValidationState() {
        let value = this.state.value;
        let validatorInverse = this.props.validatorInverse;
        let validator = this.props.validator;
        let validators = this.props.validators;
        let optionValidator = this.props.optionValidator;
        let optionValidators = this.props.optionValidators;

        let validateCheck = (validateMethod, validateInverse = false)=> {
            if (validateInverse) {
                if (validateMethod) return 'error';
            }
            else if (!validateMethod) return 'error';
            return 'success';
        }

        if (validator || validators) {
            value = value ? value.toString() : '';
            if(this.props.validatorEmpty && !value) return '';
            if (validator) {
                let validateMethod = validator(value.toString(), ...optionValidator);
                return validateCheck(validateMethod, validatorInverse)
            }
            if (validators) {
                for (let index in validators) {
                    return validateCheck(validators[index](value.toString(), ...optionValidator))
                }
            }
        }
    }

    onChange(e) {
        this.setState({value: e.target.value});
        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }

    componentDidMount() {
        this.setState({value: this.props.value})
    }

    render() {
        return (
            <FormGroup validationState={this.getValidationState()}>
                {this.props.title && <ControlLabel>{this.props.title}</ControlLabel>}
                <FormControl type={this.props.type?this.props.type:'text'} defaultValue={this.props.defaultValue}
                             placeholder={this.props.placeholder} value={this.state.value}
                             onChange={this.onChange.bind(this)} />     
            </FormGroup>
        )
    }
}

InputText.defaultProps = {
    optionValidator: [],
    validators: [],
}

InputText.propTypes = {
    title: PropTypes.string,
    handleChange: PropTypes.func,
    validator: PropTypes.func,
    optionValidator: PropTypes.array,
    validators: PropTypes.array.valueOf(PropTypes.object),
    optionValidators: PropTypes.array.valueOf(PropTypes.array),
    validatorInverse: PropTypes.bool,
    validatorEmpty: PropTypes.bool,

}