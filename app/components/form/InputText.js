import React,{Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import validator from 'validator';

export default class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', enableValidate: false, status: '', error: false}
    }

    checkValidator(validateMethod, validateInverse = false) {
        if (validateInverse) {
            if (validateMethod) {
                this.props.onError();
                this.updateStatus(true);
                return false;
            }
        }
        else if (!validateMethod) {
            this.props.onError();
            this.updateStatus(true);
            return false;
        }
        this.updateStatus(false);
        return true;
    }

    updateStatus(error) {
        console.log('update error - ' + error);
        this.setState({status: error ? 'error' : 'success', error});
    }

    getValidationState(value) {
        let validatorInverse = this.props.validatorInverse;
        let validator = this.props.validator;
        let validators = this.props.validators;
        let optionValidator = this.props.optionValidator;
        let optionValidators = this.props.optionValidators;

        if (validator || validators) {
            value = value ? value.toString() : '';
            if (this.props.validatorEmpty && !value) return '';
            // Only validate
            if (validator) {
                let validateMethod = validator(value.toString(), ...optionValidator);
                return this.checkValidator(validateMethod, validatorInverse);
            }
            // Multiple validate
            if (validators) {
                for (let index in validators) {
                    let validateMethod = validators[index](value.toString(), ...optionValidators[index]);
                    return this.checkValidator(validateMethod);
                }
            }
        }
    }

    onChange(e) {
        this.setState({value: e.target.value});
        let validate = this.getValidationState(e.target.value);
        this.props.onChange(e.target.value, validate);
    }

    componentDidMount() {
        this.setState({value: this.props.value})
    }

    render() {
        return (
            <FormGroup validationState={this.state.status}>
                {this.props.title && <ControlLabel>{this.props.title}</ControlLabel>}
                <FormControl type={this.props.type?this.props.type:'text'} defaultValue={this.props.defaultValue}
                             placeholder={this.props.placeholder} value={this.state.value}
                             onChange={this.onChange.bind(this)}/>
            </FormGroup>
        )
    }
}

InputText.defaultProps = {
    optionValidator: [],
    validators: [],
    onError: () => {

    },
    onChange: () => {

    }
}

InputText.propTypes = {
    title: PropTypes.string,
    handleChange: PropTypes.func,
    handleError: PropTypes.func,
    validator: PropTypes.func,
    optionValidator: PropTypes.array,
    validators: PropTypes.array.valueOf(PropTypes.object),
    optionValidators: PropTypes.array.valueOf(PropTypes.array),
    validatorInverse: PropTypes.bool,
    validatorEmpty: PropTypes.bool,
}