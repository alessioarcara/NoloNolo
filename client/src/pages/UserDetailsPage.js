import useForm from "../hooks/use-form";
import {addressForm, newPasswordForm, singleUploadForm} from "../helpers/formConfig";
import Button from "../components/UI/Button/Button";
import {useCallback, useContext, useState} from "react";
import useHttp from "../hooks/use-http";
import {body_changePassword, body_updateUser} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";

/* PROVVISORIO */
const userDetails = [
    {
        type: "Indirizzo",
        form: addressForm
    },
    {
        type: "Password",
        form: newPasswordForm,
    },
    {
        type: "Foto",
        form: singleUploadForm
    }
]

const UserDetailsPage = () => {
    const [whichUserDetailsOpen, setWhichUserDetailsOpen] = useState(-1)
    const {formValues, renderFormInputs, isFormValid, changeForm, resetForm} = useForm(addressForm)

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
