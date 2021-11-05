import React, {useContext, useEffect} from "react";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import ActionButtons from "../components/UI/ActionButtons/ActionButtons";
import useHttp from "../hooks/use-http";
import {body_userBoats} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";

const NewAdvertisementPage = () => {
    const {status, data: userBoats, sendRequest: fetchUserBoats} = useHttp(true)

    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const transformData = resData => resData
        fetchUserBoats({body: body_userBoats, token: authCtx.token}, transformData)
    }, [])

    return (
        <SplitScreenLayout contentLeft={<h1>Comincia adesso !</h1>}
                           contentRight={<h1>Eccomi</h1>}
                           actions={<ActionButtons/>}
        />
    );
}

export default NewAdvertisementPage;
