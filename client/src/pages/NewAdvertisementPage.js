import React, {useContext, useEffect} from "react";
import {Outlet, Route, Routes} from 'react-router-dom';
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import ActionButtons from "../components/UI/ActionButtons/ActionButtons";
import useHttp from "../hooks/use-http";
import {body_userBoats} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import NewBoat from "../components/NewAdvertisement/NewBoat";
import NewBoatLocation from "../components/NewAdvertisement/NewBoatLocation";
import NewBoatAdvertisement from "../components/NewAdvertisement/NewBoatAdvertisement";
import AvailableBoats from "../components/NewAdvertisement/AvailableBoats";

const NewAdvertisementPage = () => {
    const {status, data: userBoats, sendRequest: fetchUserBoats} = useHttp(true)

    const authCtx = useContext(AuthContext)

    useEffect(() => {
        const transformData = resData => resData
        fetchUserBoats({body: body_userBoats, token: authCtx.token}, transformData)
    }, [fetchUserBoats, authCtx.token])

    return (
        <Routes>
            <Route path={'/*'} element={<AvailableBoats/>}/>
            <Route path={'/boat'} element={<NewBoat/>}/>
            <Route path={'/location'} element={<NewBoatLocation/>}/>
            <Route path={'/advertisement'} element={<NewBoatAdvertisement/>}/>
        </Routes>
    );
}

export default NewAdvertisementPage;
