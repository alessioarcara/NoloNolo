import {
    requiredRule,
    minLengthRule,
    isEmailRule,
    isNumberRule,
    passwordMatchRule,
    maxLengthRule
} from "./InputValidationRules"
import {renderInput, renderNumberSpinner, renderTextArea} from "./inputConfig";

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
export const addressForm = {
    street: {
        ...createFormFieldConfig('Via', 'street', 'text'),
        validationRules: [
            requiredRule("street"),
            minLengthRule("street", 4)
        ]
    },
    city: {
        ...createFormFieldConfig('Città', 'city', 'text'),
        validationRules: [
            requiredRule("city"),
            minLengthRule("city", 4)
        ]
    },
    region: {
        ...createFormFieldConfig('Regione', 'region', 'text'),
        validationRules: [
            requiredRule("region"),
            minLengthRule("region", 4)
        ]
    },
    postalCode: {
        ...createFormFieldConfig('Codice postale', 'postalCode', 'number'),
        validationRules: [
            requiredRule("postal code"),
            minLengthRule("postal code", 5),
            maxLengthRule("postal code", 5)
        ]
    }
};
export const newPasswordForm = {
    oldPassword: {
        ...createFormFieldConfig('Password attuale', 'oldPassword', 'password'),
        validationRules: [
            requiredRule("old password"),
            minLengthRule("old password", 8)
        ]
    },
    password: {
        ...createFormFieldConfig('Nuova password', 'password', 'password'),
        validationRules: [
            requiredRule("new password"),
            minLengthRule("new password", 8)
        ]
    },
    confirmPassword: {
        ...createFormFieldConfig('Conferma la password', 'confirmPassword', 'password'),
        validationRules: [
            passwordMatchRule()
        ]
    }
};
export const boatForm = (yard = '', model = '', length = 0, maximumCapacity = 0) => {
    return {
        yard: {
            ...createFormFieldConfig('Yard', 'yard', 'text', yard),
            validationRules: [
                requiredRule("yard")
            ]
        },
        model: {
            ...createFormFieldConfig('Model', 'model', 'text', model),
            validationRules: [
                requiredRule("model")
            ]
        },
        length: {
            ...createFormFieldConfig('Length', 'length', 'text', length, renderNumberSpinner),
            validationRules: [
                requiredRule("length"),
                isNumberRule("length")
            ]
        },
        maximumCapacity: {
            ...createFormFieldConfig('Maximum Capacity', 'maximumCapacity', 'text', maximumCapacity, renderNumberSpinner),
            validationRules: [
                requiredRule("maximum capacity"),
                isNumberRule("maximum capacity")
            ]
        },
    };
};
export const boatLocationForm = (harbour = '', city = '', region = '') => {
    return {
        harbour: {
            ...createFormFieldConfig('Porto', 'harbour', 'text', harbour),
            validationRules: [
                requiredRule("harbour"),
                minLengthRule("harbour", 4)
            ]
        },
        city: {
            ...createFormFieldConfig('Città', 'city', 'text', city),
            validationRules: [
                requiredRule("city"),
                minLengthRule("city", 4)
            ]
        },
        region: {
            ...createFormFieldConfig('Regione', 'region', 'text', region),
            validationRules: [
                requiredRule("region"),
                minLengthRule("region", 4)
            ]
        }
    };
};
export const boatAdvertisementForm = {
    description: {
        ...createFormFieldConfig('Descrizione', 'description', '', '', renderTextArea),
        validationRules: [
            requiredRule("description"),
            minLengthRule("description", 10)
        ]
    },
    dailyFee: {
        ...createFormFieldConfig('Tariffa giornaliera', 'dailyFee', 'number', 0, renderNumberSpinner, 25),
        validationRules: [
            requiredRule("dailyFee"),
            isNumberRule("dailyFee")
        ]
    },
    fixedFee: {
        ...createFormFieldConfig('Tariffa fissa', 'fixedFee', 'number', 0, renderNumberSpinner, 25),
        validationRules: [
            requiredRule("fixedFee"),
            isNumberRule("fixedFee")
        ]
    },
}
