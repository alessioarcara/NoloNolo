import {Navigate, useLocation, useParams} from "react-router-dom";
import React, {useCallback, useContext, useEffect, useReducer} from "react";
import AuthContext from "../store/auth-context";
import {advertisementReducer} from "../reducers/advertisementReducer";
import useHttp from "../hooks/use-http";
import {body_advertisement, body_rentBoat} from "../helpers/httpConfig";
import {formatDate} from "../helpers/Utils/utils";
import LetSuspense from "../components/UI/LetSuspense/LetSuspense";
import {AdvertisementPlaceholder} from "../components/Advertisement/AdvertisementPlaceholder/AdvertisementPlaceholder";
import Modal from "../components/UI/Modal/Modal";
import InvoiceReport from "../components/BoatBill/InvoiceReport/InvoiceReport";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import ContentRight from "../components/Advertisement/ContentRight/ContentRight";
import ContentLeft from "../components/Advertisement/ContentLeft/ContentLeft";
import AdvertisementActions from "../components/Advertisement/AdvertisementActions/AdvertisementActions";
import {CLEAR_RENTAL, SHOW_CONFIRM} from "../helpers/Utils/constants";
import Notification from "../components/UI/Notification/Notification";

const AdvertisementPage = () => {
    /* Data recovery */
    const {boatId} = useParams()
    const location = useLocation();
    const {token} = useContext(AuthContext)

    const [state, dispatch] = useReducer(advertisementReducer, {
        visibleContent: false,
        isConfirming: false,
        startDate: location.state && location.state.startUrlDate ? new Date(location.state.startUrlDate) : null,
        endDate: location.state && location.state.endUrlDate ? new Date(location.state.endUrlDate) : null
    })

    const showConfirmHandler = useCallback(() => {
        dispatch({type: SHOW_CONFIRM})
    }, [])

    /* Requests to the server */
    const {status: statusBoat, data: boatPayload, sendRequest: fetchBoat, error: fetchBoatError} = useHttp(true)
    const {status: statusRental, data: rentalPayload, sendRequest: rentBoat, error: rentBoatError} = useHttp(false)

    useEffect(() => {
        fetchBoat({body: body_advertisement({boatId})}, resData => resData)
    }, [fetchBoat, boatId])

    const handleRentBoat = useCallback(() => {
        const transformData = resData => {
            if (resData.rentBoat.rentBoatData) {
                boatPayload.boatRentals = boatPayload.boatRentals.concat({
                    from: resData.rentBoat.rentBoatData.from,
                    to: resData.rentBoat.rentBoatData.to
                })
            }
            return resData.rentBoat
        }
        rentBoat({
            body: body_rentBoat({
                boatId,
                from: formatDate(state.startDate),
                to: formatDate(state.endDate),
            }),
            token
        }, transformData)

        /* setState instead of handlers for batching */
        dispatch({type: CLEAR_RENTAL})
    }, [boatId, rentBoat, boatPayload, state.startDate, state.endDate, token])

    if (statusBoat === 'completed' && fetchBoatError) {
        return <Navigate to={-1} replace/>
    }

    return (
        <>
            {statusRental === 'completed' && !rentBoatError && !rentalPayload?.rentBoatProblem &&
                <Notification message="Prenotazione riuscita" status="success"/>
            }
            {statusRental === 'completed' && rentalPayload && rentalPayload.rentBoatProblem &&
                <Modal title="Errore"> {rentalPayload.rentBoatProblem} </Modal>
            }
            {state.isConfirming &&
                <Modal
                    title="Conferma prenotazione"
                    closeModalHandler={showConfirmHandler}
                >
                    <InvoiceReport
                        dailyFee={boatPayload.advertisement.hasAdvertisement.dailyFee}
                        fixedFee={boatPayload.advertisement.hasAdvertisement.fixedFee}
                        start={state.startDate}
                        end={state.endDate}
                        statusRental={statusRental}
                        handleRentBoat={handleRentBoat}
                    />
                </Modal>
            }
        <LetSuspense
            condition={statusBoat === 'completed'}
            placeholder={AdvertisementPlaceholder}
            multiplier={1}
            checkOnce={true}
            initialDelay={400}
        >
            {boatPayload &&
            <SplitScreenLayout
                contentRight={
                    <ContentRight
                        boatId={boatId}
                        dispatch={dispatch}
                        boatModel={boatPayload.advertisement.model}
                        boatReviews={boatPayload.advertisement.reviews}
                        place={boatPayload.advertisement.isDocked}
                        images={boatPayload.advertisement.hasAdvertisement.images}
                        ownerEmail={boatPayload.advertisement.owner.email}
                        ownerAvatar={boatPayload.advertisement.owner.avatar}
                        boatDescription={boatPayload.advertisement.hasAdvertisement.description}
                        boatYard={boatPayload.advertisement.yard}
                        boatLength={boatPayload.advertisement.length}
                        boatMaxCapacity={boatPayload.advertisement.maximumCapacity}
                        boatType={boatPayload.advertisement.boatType}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        alreadyRentedDates={boatPayload.boatRentals}
                    />
                }
                contentLeft={
                    <ContentLeft
                        isVisible={state.visibleContent}
                        images={boatPayload.advertisement.hasAdvertisement.images}
                        coordinates={boatPayload.advertisement.isDocked.coordinates}
                    />
                }
                actions={
                    <AdvertisementActions
                        dailyFee={boatPayload.advertisement.hasAdvertisement.dailyFee}
                        fixedFee={boatPayload.advertisement.hasAdvertisement.fixedFee}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        onShowConfirm={showConfirmHandler}
                    />
                }
            />
            }
        </LetSuspense>
        </>
    );
};

export default AdvertisementPage;
