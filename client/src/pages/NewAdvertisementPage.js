import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Route, Routes, useParams} from 'react-router-dom';
import useHttp from "../hooks/use-http";
import {body_removeBoat, body_userBoats} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import NewBoat from "../components/NewAdvertisement/NewBoat";
import NewBoatLocation from "../components/NewAdvertisement/NewBoatLocation";
import NewBoatAdvertisement from "../components/NewAdvertisement/NewBoatAdvertisement";
import AvailableBoats from "../components/NewAdvertisement/AvailableBoats";

const NewAdvertisementPage = () => {
    const [userBoats, setUserBoats] = useState([])
    const {data: user, sendRequest} = useHttp()
    const {token} = useContext(AuthContext)

    const boatId = useParams()['*'].split('/')[0];
    const userBoat = useMemo(() => userBoats.filter(boat => boat._id === boatId)[0], [userBoats, boatId])

    useEffect(() => {
        const transformData = resData => {
            setUserBoats(resData.boatsByUser)
            return resData.user
        };
        sendRequest({body: body_userBoats, token}, transformData)
    }, [sendRequest, token])

    const handleChangeUserBoat = useCallback(body => {
        sendRequest({body, token}, resData => {
            const newBoat = Object.values(resData[Object.keys(resData)])[0]
            setUserBoats(prevBoats => prevBoats.map(userBoat => userBoat._id === newBoat._id ? newBoat : userBoat));
            return resData[Object.keys(resData)]
        })
    }, [sendRequest, token])

    const handleDeleteUserBoat = useCallback(boatId => {
        sendRequest({body: body_removeBoat({boatId}), token}, resData => {
            setUserBoats(prevBoats => prevBoats.filter(userBoat => userBoat._id !== boatId))
            return resData.removeBoat
        })
    }, [sendRequest, token])

    const stepRoutes = (
        <>
            <Route path={'boat'} element={
                <NewBoat
                    boat={userBoat}
                    onChangeUserBoat={handleChangeUserBoat}
                />
            }/>
            <Route path={'location'} element={
                <NewBoatLocation
                    boat={userBoat}
                    onChangeUserBoat={handleChangeUserBoat}
                />
            }/>
            <Route path={'advertisement'} element={
                <NewBoatAdvertisement
                    onChangeUserBoat={handleChangeUserBoat}
                />
            }/>
        </>
    )

    return (
        <Routes>
            <Route path={'/*'} element={
                <AvailableBoats
                    userName={user ? user.email : 'utente'}
                    userBoats={userBoats}
                    onDeleteUserBoat={handleDeleteUserBoat}
                />
            }/>
            {stepRoutes}
            <Route path={':boatId'}>
                {stepRoutes}
            </Route>
        </Routes>
    );
}

export default NewAdvertisementPage;
