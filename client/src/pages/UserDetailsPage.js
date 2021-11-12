import useForm from "../hooks/use-form";
import {addressForm, newPasswordForm, singleUploadForm} from "../helpers/formConfig";
import Button from "../components/UI/Button/Button";
import {useCallback, useContext, useState} from "react";
import useHttp from "../hooks/use-http";
import {body_changePassword, body_updateUser} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import UserDetailsHeader from "../components/UserDetails/Header/UserDetailsHeader";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";
import UserDetails from "../components/UserDetails/UserDetails";

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
    return (
        <>
            <UserDetailsHeader/>
            <UserInfo/>
            <UserDetails/>
        </>
    );
};

export default UserDetailsPage;
