import classes from './UserDetails.module.css';
import {addressForm, newPasswordForm} from "../../../helpers/formConfig";
import {useCallback, useState} from "react";
import useForm from "../../../hooks/use-form";
import Button from "../../UI/Button/Button";
import {body_changePassword, body_updateUser} from "../../../helpers/httpConfig";

const userDetails = [
    {
        type: "Indirizzo",
        form: addressForm
    },
    {
        type: "Password",
        form: newPasswordForm
    }
]

const addressArrange = (addressObject) => Object.keys(addressObject).map(key => ` ${addressObject[key]}`).toString().trim()

const UserDetails = ({user, sendInfo}) => {
    const [whichUserDetailsOpen, setWhichUserDetailsOpen] = useState(-1)
    const {renderFormInputs, formValues, isFormValid, changeForm, resetForm} = useForm(addressForm)

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

        if (whichUserDetailsOpen === 0)
            sendInfo(body_updateUser({
                street: formValues[0],
                city: formValues[1],
                region: formValues[2],
                postalCode: parseInt(formValues[3])
            }))
        if (whichUserDetailsOpen === 1)
            sendInfo(body_changePassword({
                oldPassword: formValues[0],
                newPassword: formValues[1]
            }))
        resetForm()
        /* Close all details */
        setWhichUserDetailsOpen(-1)
    }


    return (
        <section className={classes['details-container']}>
            {userDetails.map((details, idx) => (
                <div key={idx} className={classes.container}>
                    <div className={classes['header-container']}>
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
                        {idx === 0 && whichUserDetailsOpen !== 0 && user &&
                        <span className={classes['address-container']}>
                                {user && Object.values(user.address).some(value => value !== null && value !== '')
                                    ? addressArrange(user.address) : 'Non fornito'}
                            </span>
                        }
                        {idx === 1 && whichUserDetailsOpen !== 1 &&
                        <span className={classes['password-container']}>Aggiorna i dettagli di accesso</span>
                        }
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
