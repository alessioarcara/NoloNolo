import NumberSpinner from "../components/UI/Input/NumberSpinner";
import Input from "../components/UI/Input/Input";

export function renderNumberSpinner(handleChange, handleBlur, value, isValid, isTouched, error, key, classNames) {
    console.log(this)
    return (
        <NumberSpinner
            key={key}
            name={this.name}
            type={this.type}
            label={this.label}
            isValid={isValid}
            isTouched={isTouched}
            value={value}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={error}
            classNames={classNames}
        />
    )
}

export function renderInput(handleChange, handleBlur, value, isValid, isTouched, error, key, classNames) {
    console.log(this)
    return (
        <Input
            key={key}
            name={this.name}
            type={this.type}
            label={this.label}
            isValid={isValid}
            isTouched={isTouched}
            value={value}
            handleBlur={handleBlur}
            handleChange={handleChange}
            errorMessage={error}
            classNames={classNames}
        />
    )
}
