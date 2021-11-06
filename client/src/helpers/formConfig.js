import React from "react";
import Input from "../components/UI/Input/Input"

import {requiredRule, minLengthRule, isEmailRule} from "./InputValidationRules"

function createFormFieldConfig(label, name, type, defaultValue = '') {
    return {
        renderInput: (handleChange, handleBlur, value, isValid, isTouched, error, key, classNames) => {
            return (
                <Input
                    key={key}
                    name={name}
                    type={type}
                    label={label}
                    isValid={isValid}
                    isTouched={isTouched}
                    value={value}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errorMessage={error}
                    classNames={classNames}
                />
            );
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
}
