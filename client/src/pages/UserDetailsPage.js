import useForm from "../hooks/use-form";
import {addressForm, newPasswordForm} from "../helpers/formConfig";
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
        type: "Foto"
    }
]

const UserDetailsPage = () => {
    const {renderFormInputs, changeForm} = useForm(addressForm)

    const openDetailsHandler = useCallback(form => {
        changeForm(form)
    }, [])

    return (
        /* PROVVISORIO */
        <section className="centered">
            {userDetails.map((details, idx) => (
                <div key={idx}>
                    <p>{details.type}</p>
                    <Button className="btn btn-secondary" onClick={() => openDetailsHandler(details.form)}>Modifica</Button>
                    {renderFormInputs()}
                </div>
            ))}
        </section>
    );
};

export default UserDetailsPage;
