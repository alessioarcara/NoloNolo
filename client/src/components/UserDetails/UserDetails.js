import classes from './UserDetails.module.css';
import {addressForm, newPasswordForm, singleUploadForm} from "../../helpers/formConfig";
import {useCallback, useState} from "react";
import useForm from "../../hooks/use-form";
import Button from "../UI/Button/Button";

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
    const {renderFormInputs, isFormValid, changeForm, resetForm} = useForm(addressForm)

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
                            className="btn btn-secondary"
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