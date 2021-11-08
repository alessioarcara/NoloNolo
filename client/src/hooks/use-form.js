import {useState, useCallback} from 'react';

function useForm(formObj) {
    const [form, setForm] = useState(formObj);

    function renderFormInputs(classNames) {
        return Object.values(form).map((inputObj) => {
            const {value, label, errorMessage, valid, touched, renderNumberSpinner, renderInput, config} = inputObj;
            return config === 'number' ?
                renderNumberSpinner(onInputChange, onInputBlur, value, valid, touched, errorMessage, label, classNames) :
                renderInput(onInputChange, onInputBlur, value, valid, touched, errorMessage, label, classNames) ;
        });
    }

    const isInputFieldValid = useCallback(
        (inputField) => {
            for (const rule of inputField.validationRules) {
                if (!rule.validate(inputField.value, form)) {
                    inputField.errorMessage = rule.message;
                    return false;
                }
            }
            return true;
        }, [form]);

    const onInputChange = useCallback(event => {
            console.log(event)
            const { name, value } = event.target;
            // copy input object whose value was changed
            const inputObj = { ...form[name] };
            // update value
            inputObj.value = value;

            // update input field's validity
            const isValidInput = isInputFieldValid(inputObj);
            // if input is valid and it was previously invalid
            // set its valid status to true
            if (isValidInput && !inputObj.valid) {
                inputObj.valid = true;
            } else if (!isValidInput && inputObj.valid) {
                // if input is not valid and it was previously valid
                // set its valid status to false
                inputObj.valid = false;
            }

            setForm({ ...form, [name]: inputObj });
        },
        [form, isInputFieldValid]
    );

    const onInputBlur = useCallback(event => {
        const { name } = event.target;
        const inputObj = { ...form[name] };

        // mark input field as touched
        inputObj.touched = true;

        const isValidInput = isInputFieldValid(inputObj);

        if (isValidInput && !inputObj.valid) {
            inputObj.valid = true;
        } else if (!isValidInput && inputObj.valid) {
            inputObj.valid = false;
        }

        setForm({ ...form, [name]: inputObj });
    }, [form, isInputFieldValid])

    const isFormValid = useCallback(() => {
        let isValid = true;
        const arr = Object.values(form);

        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].valid) {
                isValid = false;
                break;
            }
        }
        return isValid;
    }, [form]);

    const resetForm = useCallback(() => {
        setForm(formObj)
    }, [formObj])

    const formValues = Object.values(form).map(inputObj => inputObj.value)
    return {formValues, renderFormInputs, isFormValid, resetForm };
}

export default useForm;
