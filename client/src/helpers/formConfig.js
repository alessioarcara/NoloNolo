import React from "react";
import Input from "../components/UI/Input/Input"

import {requiredRule, minLengthRule, isEmailRule, isNumberRule} from "./InputValidationRules"
import SailBoatIcon from "../components/UI/icons/BoatIcons/SailBoatIcon";
import MotorBoatIcon from "../components/UI/icons/BoatIcons/MotorBoatIcon";
import CatamaranIcon from "../components/UI/icons/BoatIcons/CatamaranIcon";
import InflatableBoatIcon from "../components/UI/icons/BoatIcons/InflatableBoatIcon";
import NumberSpinner from "../components/UI/Input/NumberSpinner";

function createFormFieldConfig(label, name, type, defaultValue = '', defaultConfig = 'input') {
    return {
        renderNumberSpinner: (handleChange, handleBlur, value, isValid, isTouched, error, key, classNames) => {
            return (
                <NumberSpinner
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
            )
        },
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
        config: defaultConfig,
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
        ...createFormFieldConfig('Length', 'length', 'text', 0, 'number'),
        validationRules: [
            requiredRule("length"),
            isNumberRule("length")
        ]
    },
    maximumCapacity: {
        ...createFormFieldConfig('Maximum Capacity', 'maximumCapacity', 'text', 0, 'number'),
        validationRules: [
            requiredRule("maximum capacity"),
            isNumberRule("maximum capacity")
        ]
    },
    // sailboat: {
    //     ...createFormFieldConfig(<SailBoatIcon/>, 'boatType', 'radio'),
    //     validationRules: [
    //     ]
    // },
    // motorboat: {
    //     ...createFormFieldConfig(<MotorBoatIcon/>, 'boatType', 'radio'),
    //     validationRules: [
    //     ]
    // },
    // catamaran: {
    //     ...createFormFieldConfig(<CatamaranIcon/>, 'boatType', 'radio'),
    //     validationRules: [
    //     ]
    // },
    // dinghy: {
    //     ...createFormFieldConfig(<InflatableBoatIcon/>, 'boatType', 'radio'),
    //     validationRules: [
    //     ]
    // },
}
