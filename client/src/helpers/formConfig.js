import {requiredRule, minLengthRule, isEmailRule, isNumberRule} from "./InputValidationRules"
import {renderInput, renderNumberSpinner} from "./inputConfig";


function createFormFieldConfig(label, name, type, defaultValue = '', extension = renderInput, valueChange = 1) {
    return {
        render: function render(handleChange, handleBlur, value, isValid, isTouched, error, key, classNames) {
            return extension.call({label, name, type, valueChange}, ...arguments)
        },
        label,
        value: defaultValue,
        valid: false,
        errorMessage: '',
        touched: false,
    };
}

export const authForm = {
    email: {
        ...createFormFieldConfig('Email', 'email', 'email'),
        validationRules: [
            requiredRule("email"),
            isEmailRule("email"),
            minLengthRule("email", 10)
        ]
    },
    password: {
        ...createFormFieldConfig('Password', 'password', 'password'),
        validationRules: [
            requiredRule("password"),
            minLengthRule("password", 8),
        ]
    }
};
export const boatForm = {
    yard: {
        ...createFormFieldConfig('Yard', 'yard', 'text'),
        validationRules: [
            requiredRule("yard")
        ]
    },
    model: {
        ...createFormFieldConfig('Model', 'model', 'text'),
        validationRules: [
            requiredRule("model")
        ]
    },
    length: {
        ...createFormFieldConfig('Length', 'length', 'text', 0, renderNumberSpinner),
        validationRules: [
            requiredRule("length"),
            isNumberRule("length")
        ]
    },
    maximumCapacity: {
        ...createFormFieldConfig('Maximum Capacity', 'maximumCapacity', 'text', 0, renderNumberSpinner),
        validationRules: [
            requiredRule("maximum capacity"),
            isNumberRule("maximum capacity")
        ]
    },
}
