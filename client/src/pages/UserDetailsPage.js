import UserDetailsHeader from "../components/UserDetails/Header/UserDetailsHeader";

import useForm from "../hooks/use-form";
import {addressForm, newPasswordForm, singleUploadForm} from "../helpers/formConfig";
import Button from "../components/UI/Button/Button";
import {useCallback, useState} from "react";
import UserDetails from "../components/UserDetails/UserDetails";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";

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
    return (
        <>
            <UserDetailsHeader/>
            <UserInfo/>
            <UserDetails/>
        </>
    );
};

export default UserDetailsPage;
