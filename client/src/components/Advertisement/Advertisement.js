import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
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

    const {status: statusBoat, data: boat, sendRequest: fetchBoat} = useHttp(true)
    const {status: statusRental, data: rentalPayload, sendRequest: rentBoat} = useHttp(false)

    // TODO: should implement some bullet-proof method for convert string to date
    const [startDate, setStartDate] = useState(location.state.startUrlDate ? new Date(location.state.startUrlDate) : null);
    const [endDate, setEndDate] = useState(location.state.endUrlDate ? new Date(location.state.endUrlDate) : null);

    const changeStartDateHandler = useCallback((start) => {
        setStartDate(start)
    }, [])

    const changeEndDateHandler = useCallback((end) => {
        setEndDate(end)
    }, [])

    useEffect(() => {
        const transformData = resData => resData.boat
        fetchBoat({body: body_informations({boatId})}, transformData)
    }, [fetchBoat, boatId])

    // TODO: this is only for example purpose :)
    // submit? button clickhandler?
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
    if (statusBoat === "completed" && boat) {
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
                    boatModel={boat.model}
                    boatReviews={boat.hasAdvertisement.reviews}
                    place={boat.isDocked}
                    images={boat.hasAdvertisement.images}
                    ownerEmail={boat.owner.email}
                    ownerAvatar={boat.owner.avatar}
                    boatDescription={boat.hasAdvertisement.description}
                    boatYard={boat.yard}
                    boatLength={boat.length}
                    boatMaxCapacity={boat.maximumCapacity}
                    boatType={boat.boatType}
                    startDate={startDate}
                    endDate={endDate}
                    changeStartDateHandler={changeStartDateHandler}
                    changeEndDateHandler={changeEndDateHandler}
                />
            </>
        )
        contentLeft = (
            <ContentLeft
                isVisible={visibleContent}
                images={boat.hasAdvertisement.images}
                boatPosition={boat.isDocked.coordinates}
            />
        )
        actions = (
            <Actions
                dailyFee={boat.hasAdvertisement.dailyFee}
                fixedFee={boat.hasAdvertisement.fixedFee}
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
