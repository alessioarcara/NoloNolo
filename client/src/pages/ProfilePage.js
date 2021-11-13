import React, {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import {body_user} from "../helpers/httpConfig";
import ProfileShipowner from "../components/Profile/ProfileShipowner";
import ProfileCustomer from "../components/Profile/ProfileCustomer";
import Profile from "../components/Profile/Profile";


const ProfilePage = () => {

    const authCtx = useContext(AuthContext)

    const {status, error, data: user, sendRequest: fetchUser} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.user
        fetchUser({body: body_user, token: authCtx.token}, transformData)
    }, [fetchUser, authCtx.token])

    let content = <LoadingSpinner/>

    if (status === "completed" && user && user.userType === "customer") {
        content = <ProfileCustomer/>
    }

    if (status === "completed" && user && user.userType === "shipowner") {
        content = (
            <>
                <ProfileCustomer/>
                <ProfileShipowner/>
            </>
        )
    }

    if (status === "completed" && error) {
        content = <p>User not found.</p>
    }

    return (
        <Profile auth={authCtx}>
            {content}
        </Profile>
    );
};

export default ProfilePage;
