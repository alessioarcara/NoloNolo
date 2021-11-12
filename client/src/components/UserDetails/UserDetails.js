import classes from './UserDetails.module.css';
import {addressForm, newPasswordForm, singleUploadForm} from "../../helpers/formConfig";
import {useCallback, useContext, useState} from "react";
import useForm from "../../hooks/use-form";
import Button from "../UI/Button/Button";
import {body_changePassword, body_updateUser} from "../../helpers/httpConfig";
import AuthContext from "../../store/auth-context";
import useHttp from "../../hooks/use-http";

const userDetails = [
    {
        type: "Indirizzo",
        form: addressForm
    },
    {
        type: "Password",
        form: newPasswordForm
    },
    {
        type: "Foto",
        form: singleUploadForm
    }
]

const UserDetails = () => {
    const [whichUserDetailsOpen, setWhichUserDetailsOpen] = useState(-1)
    const {renderFormInputs, formValues, isFormValid, changeForm, resetForm} = useForm(addressForm)

    const {token} = useContext(AuthContext)
    const {sendRequest} = useHttp(false)

    const openDetailsHandler = useCallback((form, which) => {
        if (which === whichUserDetailsOpen)
            setWhichUserDetailsOpen(-1)
        else {
            setWhichUserDetailsOpen(which)
            changeForm(form)
        }
    }, [changeForm, whichUserDetailsOpen])

    const saveDetailsHandler = (event) => {
        event.preventDefault()
        const transformData = resData => resData[Object.keys(resData)]

        if (whichUserDetailsOpen === 0)
            sendRequest({
                body: body_updateUser({
                    street: formValues[0],
                    city: formValues[1],
                    region: formValues[2],
                    postalCode: parseInt(formValues[3])
                }),
                token
            }, transformData)
        if (whichUserDetailsOpen === 1)
            sendRequest({
                body: body_changePassword({
                    oldPassword: formValues[0],
                    newPassword: formValues[1]
                }),
                token
            }, transformData)
        resetForm()
    }

    return (
        <section className={classes['details-container']}>
            {userDetails.map((details, idx) => (
                <div key={idx} className={classes.container}>
                    <div className={classes['details-header']}>
                        <div className={classes['type']}>{details.type}</div>
                        <Button
                            disabled={whichUserDetailsOpen !== -1 && idx !== whichUserDetailsOpen}
                            className={`${classes['modify']} btn btn-secondary`}
                            onClick={() => openDetailsHandler(details.form, idx)}
                        >
                            {whichUserDetailsOpen === idx ? 'Annulla' : 'Modifica'}
                        </Button>
                    </div>
                    <form>
                        {whichUserDetailsOpen === idx &&
                        <>
                            {renderFormInputs()}
                            <Button type="submit"
                                    onClick={saveDetailsHandler}
                                    className={`${classes['save-button']} btn btn-outline-primary`}
                                    disabled={!isFormValid()}
                            >
                                Salva
                            </Button>
                        </>
                        }
                    </form>
                </div>
            ))}
        </section>
    );
}

export default UserDetails