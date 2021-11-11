import UserDetailsHeader from "../components/UserDetails/Header/UserDetailsHeader";

import useForm from "../hooks/use-form";
import {addressForm, newPasswordForm, singleUploadForm} from "../helpers/formConfig";
import Button from "../components/UI/Button/Button";
import {useCallback, useState} from "react";

/* PROVVISORIO */
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

const UserDetailsPage = () => {
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
        <section className="centered">
            {userDetails.map((details, idx) => (
                <div key={idx}>
                    <p>{details.type}</p>
                    <Button
                        disabled={whichUserDetailsOpen !== -1 && idx !== whichUserDetailsOpen}
                        className="btn btn-secondary"
                        onClick={() => openDetailsHandler(details.form, idx)}>
                        Modifica
                    </Button>
                    <form>
                        {
                            whichUserDetailsOpen === idx &&
                            <>
                                {renderFormInputs()}
                                <Button type="submit"
                                        onClick={saveDetailsHandler}
                                        className="btn btn-outline-primary"
                                        disabled={!isFormValid()}>
                                    Salva
                                </Button>
                            </>
                        }
                    </form>
                </div>
            ))}
        </section>
    );
};

export default UserDetailsPage;
