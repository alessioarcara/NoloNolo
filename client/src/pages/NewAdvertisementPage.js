import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Route, Routes, useParams} from 'react-router-dom';
import useHttp from "../hooks/use-http";
import {body_userBoats} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import NewBoat from "../components/NewAdvertisement/NewBoat";
import NewBoatLocation from "../components/NewAdvertisement/NewBoatLocation";
import NewBoatAdvertisement from "../components/NewAdvertisement/NewBoatAdvertisement";
import AvailableBoats from "../components/NewAdvertisement/AvailableBoats";
import {parseMutationResponse} from "../helpers/Utils/utils";

const NewAdvertisementPage = () => {
    const [userBoats, setUserBoats] = useState([])
    const {data: user, sendRequest} = useHttp()
    const {token} = useContext(AuthContext)

    const boatId = useParams()['*'].split('/')[0];
    const userBoat = useMemo(() => userBoats.filter(boat => boat._id === boatId)[0], [userBoats, boatId])

    useEffect(() => {
        sendRequest({body: body_userBoats, token}, resData => {
            setUserBoats(resData.boatsByUser)
            return resData.user
        })
    }, [sendRequest, token])

    const handleMutationUserBoat = useCallback((body, applyData) =>
        sendRequest(
            {body, token},
            parseMutationResponse(setUserBoats, applyData)
        ),
        [sendRequest, token])

    const stepRoutes = (
        <>
            <Route path={'boat'} element={
                <NewBoat
                    boat={userBoat}
                    onMutationUserBoat={handleMutationUserBoat}
                />
            }/>
            <Route path={'location'} element={
                <NewBoatLocation
                    boat={userBoat}
                    onMutationUserBoat={handleMutationUserBoat}
                />
            }/>
            <Route path={'advertisement'} element={
                <NewBoatAdvertisement
                    onMutationUserBoat={handleMutationUserBoat}
                    boatId={boatId}
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
                    onMutationUserBoat={handleMutationUserBoat}
                />
            }/>
            <Route path={'boat'} element={
                <NewBoat
                    onMutationUserBoat={handleMutationUserBoat}
                />
            }/>
            <Route path={':boatId'}>
                {stepRoutes}
            </Route>
        </Routes>
    );
}

export default NewAdvertisementPage;
