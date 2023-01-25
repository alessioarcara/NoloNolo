import React, {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import {body_user} from "../helpers/httpConfig";
import ProfileShipowner from "../components/Profile/ProfileShipowner";
import ProfileCustomer from "../components/Profile/ProfileCustomer";
import Profile from "../components/Profile/Profile";
import {Navigate, useNavigationType} from "react-router-dom";
import {parseQueryResponse} from "../helpers/Utils/utils";
import LetSuspense from "../components/UI/LetSuspense/LetSuspense";
import {ProfilePlaceholder} from "../components/Profile/ProfilePlaceholder/ProfilePlaceholder";
import Spacer from "../components/UI/Spacer/Spacer";

const ProfilePage = () => {
    const navigationType = useNavigationType()
    const {token, logout} = useContext(AuthContext)

    const {status, error, data: user, sendRequest: fetchUser} = useHttp(true)

    useEffect(() =>
            fetchUser({body: body_user, token}, parseQueryResponse),
        [fetchUser, token])

    let content;

    if (status === "completed" && user && user.userType === "customer")
        content = <ProfileCustomer/>

    if (status === "completed" && user && user.userType === "shipowner")
        content = (
            <>
                <ProfileCustomer/>
                <ProfileShipowner/>
            </>
        )

    if (status === "completed" && user && user.userType === "admin")
        content = navigationType === "PUSH" ?
            <Navigate to="/administration"/> :
            <Navigate to="/"/>

    if (status === "completed" && error)
        content = <p>User not found.</p>

    return (
        <LetSuspense
            condition={status === 'completed'}
            placeholder={ProfilePlaceholder}
            initialDelay={200}
            multiplier={1}
        >
            <Profile logout={logout}>
                {content}
            </Profile>
            <Spacer heightVh="15"/>
        </LetSuspense>
    );
};

export default ProfilePage;
