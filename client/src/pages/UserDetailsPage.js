import useForm from "../hooks/use-form";
import {addressForm, newPasswordForm} from "../helpers/formConfig";
import Button from "../components/UI/Button/Button";
import {useCallback, useContext, useRef, useState} from "react";
import useHttp from "../hooks/use-http";
import {body_addAvatar, body_changePassword, body_updateUser} from "../helpers/httpConfig";
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
]

const UserDetailsPage = () => {
    const [whichUserDetailsOpen, setWhichUserDetailsOpen] = useState(-1)
    const {formValues, renderFormInputs, isFormValid, changeForm, resetForm} = useForm(addressForm)

    const {token} = useContext(AuthContext)

    const {sendRequest} = useHttp(false)

    const fileRef = useRef()

    const openDetailsHandler = useCallback((form, which) => {
        if (which === whichUserDetailsOpen)
            setWhichUserDetailsOpen(-1)
        else {
            setWhichUserDetailsOpen(which)
            changeForm(form)
        }
    }, [changeForm, whichUserDetailsOpen])

    const fileChangeHandler = (evt) => {
        evt.preventDefault()
        const formData = new FormData()
        formData.append("operations", body_addAvatar.operations)
        formData.append("map", body_addAvatar.map)
        formData.append("0", fileRef.current.files[0])

        sendRequest({body: formData, token}, resData => resData)
    }

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
            <form onSubmit={fileChangeHandler}>
                <input ref={fileRef} name="avatar" type="file"/>
                <button>Upload</button>
            </form>
        </section>
    );
};

export default UserDetailsPage;
