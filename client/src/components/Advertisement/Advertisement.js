import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {body_informations, body_rentBoat} from "../../helpers/httpConfig";
import ContentRight from "./ContentRight/ContentRight";
import ContentLeft from "./ContentLeft/ContentLeft";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import {AdvertisementPlaceholder} from "./AdvertisementPlaceholder/AdvertisementPlaceholder";
import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import classes from "./Advertisement.module.css";
import AdvertisementActions from "./AdvertisementActions/AdvertisementActions";
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

    const alreadyRentedDates = boatPayload && boatPayload.boatRentals;

    useEffect(() => {
        fetchBoat({body: body_informations({boatId})}, resData => resData)
    }, [fetchBoat, boatId])

    const handleRentBoat = () => {
        const transformData = resData => {
            boatPayload.boatRentals = boatPayload.boatRentals.concat({
                from: resData.rentBoat.rentBoatData.from,
                to: resData.rentBoat.rentBoatData.to
            })
            console.log(resData)
            return resData.rentBoat
        }
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

    return (
            <LetSuspense
                condition={statusBoat === 'completed'}
                placeholder={AdvertisementPlaceholder}
                multiplier={1}
                delay={2000}
            >
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
                {boatPayload &&
                <SplitScreenLayout
                    contentRight={
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
                            alreadyRentedDates={alreadyRentedDates}
                        />
                    }
                    contentLeft={
                        <ContentLeft
                            isVisible={visibleContent}
                            images={boatPayload.boat.hasAdvertisement.images}
                            boatPosition={boatPayload.boat.isDocked.coordinates}
                        />
                    }
                    actions={
                        <AdvertisementActions
                            dailyFee={boatPayload.boat.hasAdvertisement.dailyFee}
                            fixedFee={boatPayload.boat.hasAdvertisement.fixedFee}
                            handleRentBoat={handleRentBoat}
                            statusRental={statusRental}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    }
                    rightLayoutActionsClassName={classes['action-layout']}
                    rightLayoutContentClassName={classes[`layout-content-right`]}
                />
                }
            </LetSuspense>
    );
};

export default Advertisement;
