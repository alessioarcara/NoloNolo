import React, {Suspense, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Route, Routes, useNavigate, useParams} from 'react-router-dom';
import useHttp from "../hooks/use-http";
import {body_userBoats} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import {aggregateBoatsWithRentals, parseMutationResponse} from "../helpers/Utils/utils";
import Modal from "../components/UI/Modal/Modal";
import Fallback from "../components/UI/Fallback/Fallback";

const UserBoats = React.lazy(() => import('../components/NewAdvertisement/AvailableBoats'));
const NewBoat = React.lazy(() => import('../components/NewAdvertisement/NewBoat'));
const NewLocation = React.lazy(() => import('../components/NewAdvertisement/NewBoatLocation'));
const NewAdvertisement = React.lazy(() => import('../components/NewAdvertisement/NewBoatAdvertisement'));


const NewAdvertisementPage = () => {
    const [userBoats, setUserBoats] = useState([])
    const navigate = useNavigate()
    const {status, error, data: user, sendRequest} = useHttp()
    const {token} = useContext(AuthContext)

    const boatId = useParams()['*'].split('/')[0];
    const userBoat = useMemo(() => userBoats && userBoats.filter(boat => boat._id === boatId)[0], [userBoats, boatId])

    useEffect(() => {
        sendRequest({body: body_userBoats, token}, resData => {
            setUserBoats(
                Object.values(aggregateBoatsWithRentals(resData.boatsByUser, resData.rentalsByShipowner))
            )
            return resData.user
        })
    }, [sendRequest, token])

    const handleMutationUserBoat = useCallback((body, applyData, applyWhere) =>
        sendRequest(
            {body, token},
            applyWhere ?
                parseMutationResponse(setUserBoats, applyData, navigate, applyWhere) :
                parseMutationResponse(setUserBoats, applyData)
        ),
        [sendRequest, token, navigate])

    const stepRoutes = (
        <>
            <Route path={'boat'} element={
                <NewBoat
                    boat={userBoat}
                    key={userBoat ? userBoat._id : undefined}
                    onMutationUserBoat={handleMutationUserBoat}
                />
            }/>
            <Route path={'location'} element={
                <NewLocation
                    boat={userBoat}
                    key={userBoat ? userBoat._id : undefined}
                    onMutationUserBoat={handleMutationUserBoat}
                />
            }/>
            <Route path={'advertisement'} element={
                <NewAdvertisement
                    onMutationUserBoat={handleMutationUserBoat}
                    boatId={boatId}
                />
            }/>
        </>
    )

    return (
        <Suspense fallback={<Fallback/>}>
            {/*{status === 'completed' && payload && payload.authProblem && <Modal title="Error">{payload.authProblem}</Modal>}*/}
            {status === 'completed' && error && <Modal title="Error">{error}</Modal>}
            <Routes>
                <Route index element={
                    <UserBoats
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
        </Suspense>
    );
}

export default NewAdvertisementPage;
