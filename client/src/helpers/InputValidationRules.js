function createValidationRule(ruleName, errorMessage, validateFunc) {
    return {
        name: ruleName,
        message: errorMessage,
        validate: validateFunc
    };
}

export function requiredRule(inputName) {
    return createValidationRule(
        "required",
        `${inputName} required`,
        (inputValue, formObj) => inputValue.length !== 0
    );
}

export function minLengthRule(inputName, minCharacters) {
    return createValidationRule(
        "minLength",
        `${inputName} should contain atleast ${minCharacters} characters`,
        (inputValue, formObj) => inputValue.length >= minCharacters
    );
}

export function isEmailRule(inputName) {
    return createValidationRule(
        "isEmail",
        `Enter valid ${inputName}`,
        (inputValue, formObj) => inputValue.includes('@')
    );
}

export function passwordMatchRule() {
    return createValidationRule(
        "passwordMatch",
        `passwords do not match`,
        (inputValue, formObj) => inputValue === formObj.password.value
    );
}

export function isNumberRule(inputName) {
    return createValidationRule(
        "isNumber",
        `${inputName} should be a number`,
        (inputValue, formObj) => !isNaN(parseInt(inputValue))
    );
}
