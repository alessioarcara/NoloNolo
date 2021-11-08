import React, {useCallback, useContext, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {body_informations, body_rentBoat} from "../../helpers/httpConfig";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ContentRight from "./ContentRight/ContentRight";
import ContentLeft from "./ContentLeft/ContentLeft";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import {AdvertisementPlaceholder} from "./AdvertisementPlaceholder/AdvertisementPlaceholder";
import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import classes from "./Advertisement.module.css";
import Actions from "./Actions/Actions";
import AuthContext from "../../store/auth-context";
import {formatDate} from "../../helpers/utils";
import Modal from "../UI/Modal/Modal";

const Advertisement = () => {
    const [visibleContent, setVisibleContent] = useState(false)
    const {boatId} = useParams()
    const location = useLocation();
    const {token} = useContext(AuthContext)

    const {status: statusBoat, data: boatPayload, sendRequest: fetchBoat} = useHttp(true)
    const {status: statusRental, data: rentalPayload, sendRequest: rentBoat} = useHttp(false)

    const [startDate, setStartDate] = useState(location.state.startUrlDate ? new Date(location.state.startUrlDate) : null);
    const [endDate, setEndDate] = useState(location.state.endUrlDate ? new Date(location.state.endUrlDate) : null);

    const changeStartDateHandler = useCallback((start) => {
        setStartDate(start)
    }, [])

    const changeEndDateHandler = useCallback((end) => {
        setEndDate(end)
    }, [])

    useEffect(() => {
        fetchBoat({body: body_informations({boatId})}, resData => resData)
    }, [fetchBoat, boatId])

    const rentBoatHandler = () => {
        const transformData = resData => resData.rentBoat
        rentBoat({
            body: body_rentBoat({
                boatId,
                from: formatDate(startDate),
                to: formatDate(endDate),
                bill: 1000
            }),
            token
        }, transformData)
    }

    let contentRight = <LoadingSpinner/>
    let contentLeft = <LoadingSpinner/>
    let actions = <LoadingSpinner/>
    if (statusBoat === "completed" && boatPayload) {
        contentRight = (
            <>
                {statusRental === 'completed' && rentalPayload && rentalPayload.rentBoatProblem &&
                    <Modal title="Errore">
                        Prenotazione già presente
                    </Modal>
                }
                {statusRental === 'completed' && rentalPayload && !rentalPayload.rentBoatProblem &&
                    <Modal title="Prenotato">
                        Prenotazione avvenuta con successo!
                    </Modal>
                }
                <ContentRight
                    setVisibleContent={setVisibleContent}
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
                    startDate={startDate}
                    endDate={endDate}
                    changeStartDateHandler={changeStartDateHandler}
                    changeEndDateHandler={changeEndDateHandler}
                    alreadyRentedDates={boatPayload.boatRentals}
                />
            </>
        )
        contentLeft = (
            <ContentLeft
                isVisible={visibleContent}
                images={boatPayload.boat.hasAdvertisement.images}
                boatPosition={boatPayload.boat.isDocked.coordinates}
            />
        )
        actions = (
            <Actions
                dailyFee={boatPayload.boat.hasAdvertisement.dailyFee}
                fixedFee={boatPayload.boat.hasAdvertisement.fixedFee}
                rentBoatHandler={rentBoatHandler}
                statusRental={statusRental}
                startDate={startDate}
                endDate={endDate}
            />
        )
    }

    return (
        <>
            <LetSuspense
                condition={statusBoat === 'completed'}
                placeholder={AdvertisementPlaceholder}
                multiplier={1}
                delay={2000}
            >
                <SplitScreenLayout
                    contentRight={contentRight}
                    contentLeft={contentLeft}
                    actions={actions}
                    rightLayoutActionsClassName={classes['action-layout']}
                    rightLayoutContentClassName={classes[`layout-content-right`]}
                />
            </LetSuspense>
        </>
    );
};

export default Advertisement;
