import {useLocation, useParams} from "react-router-dom";
import React, {useCallback, useContext, useEffect, useReducer} from "react";
import AuthContext from "../store/auth-context";
import {advertisementReducer} from "../reducers/advertisementReducer";
import useHttp from "../hooks/use-http";
import {body_informations, body_rentBoat} from "../helpers/httpConfig";
import {formatDate, rangeDate} from "../helpers/utils";
import LetSuspense from "../components/UI/LetSuspense/LetSuspense";
import {AdvertisementPlaceholder} from "../components/Advertisement/AdvertisementPlaceholder/AdvertisementPlaceholder";
import Modal from "../components/UI/Modal/Modal";
import BoatBill from "../components/Advertisement/BoatBill/BoatBill";
import InvoiceReport from "../components/Advertisement/BoatBill/InvoiceReport/InvoiceReport";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import ContentRight from "../components/Advertisement/ContentRight/ContentRight";
import ContentLeft from "../components/Advertisement/ContentLeft/ContentLeft";
import AdvertisementActions from "../components/Advertisement/AdvertisementActions/AdvertisementActions";
import {CLEAR_RENTAL, SHOW_BILL} from "../helpers/constants";

const AdvertisementPage = () => {
    /* Data recovery */
    const {boatId} = useParams()
    const location = useLocation();
    const {token} = useContext(AuthContext)

    const [state, dispatch] = useReducer(advertisementReducer, {
        visibleContent: false,
        isBillShow: false,
        startDate: location.state.startUrlDate ? new Date(location.state.startUrlDate) : null,
        endDate: location.state.endUrlDate ? new Date(location.state.endUrlDate) : null
    })

    const showBillHandler = useCallback(() => {
        dispatch({type: SHOW_BILL})
    }, [])


    /* Requests to the server */
    const {status: statusBoat, data: boatPayload, sendRequest: fetchBoat} = useHttp(true)
    const {status: statusRental, data: rentalPayload, sendRequest: rentBoat} = useHttp(false)

    useEffect(() => {
        fetchBoat({body: body_informations({boatId})}, resData => resData)
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

    return (
        <LetSuspense
            condition={statusBoat === 'completed'}
            placeholder={AdvertisementPlaceholder}
            multiplier={1}
            checkOnce={true}
            delay={2000}
        >
            {statusRental === 'completed' && rentalPayload && rentalPayload.rentBoatProblem &&
            <Modal title="Errore">
                Prenotazione già presente
            </Modal>
            }
            {statusRental === 'completed' && rentalPayload && !rentalPayload.rentBoatProblem &&
            <Modal title='Fattura'>
                <BoatBill
                    billNumber={rentalPayload.rentBoatData.billNumber}
                    from={rentalPayload.rentBoatData.from}
                    to={rentalPayload.rentBoatData.to}
                    boatData={rentalPayload.rentBoatData.boat}
                    customer={rentalPayload.rentBoatData.customer.email}
                    createdAt={rentalPayload.rentBoatData.createdAt}
                    dailyFee={boatPayload.boat.hasAdvertisement.dailyFee}
                    fixedFee={boatPayload.boat.hasAdvertisement.fixedFee}
                    total={rentalPayload.rentBoatData.totalAmount}
                />
            </Modal>
            }
            {state.isBillShow &&
            <Modal
                title="Conferma prenotazione"
                closeModalHandler={showBillHandler}
            >
                <InvoiceReport
                    dailyFee={boatPayload.boat.hasAdvertisement.dailyFee}
                    fixedFee={boatPayload.boat.hasAdvertisement.fixedFee}
                    start={state.startDate}
                    end={state.endDate}
                    statusRental={statusRental}
                    handleRentBoat={handleRentBoat}
                />
            </Modal>
            }
            {boatPayload &&
            <SplitScreenLayout
                contentRight={
                    <ContentRight
                        boatId={boatId}
                        dispatch={dispatch}
                        boatModel={boatPayload.boat.model}
                        boatReviews={boatPayload.boat.hasAdvertisement.reviews}
                        place={boatPayload.boat.isDocked}
                        images={boatPayload.boat.hasAdvertisement.images}
                        ownerEmail={boatPayload.boat.owner.email}
                        ownerAvatar={boatPayload.boat.owner.avatar}
                        boatDescription={boatPayload.boat.hasAdvertisement.description}
                        boatYard={boatPayload.boat.yard}
                        boatLength={boatPayload.boat.length}
                        boatMaxCapacity={boatPayload.boat.maximumCapacity}
                        boatType={boatPayload.boat.boatType}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        alreadyRentedDates={boatPayload.boatRentals}
                    />
                }
                contentLeft={
                    <ContentLeft
                        isVisible={state.visibleContent}
                        images={boatPayload.boat.hasAdvertisement.images}
                        boatPosition={boatPayload.boat.isDocked.coordinates}
                    />
                }
                actions={
                    <AdvertisementActions
                        dailyFee={boatPayload.boat.hasAdvertisement.dailyFee}
                        fixedFee={boatPayload.boat.hasAdvertisement.fixedFee}
                        startDate={state.startDate}
                        endDate={state.endDate}
                        onShowBill={showBillHandler}
                    />
                }
            />
            }
        </LetSuspense>
    );
};

export default AdvertisementPage;
