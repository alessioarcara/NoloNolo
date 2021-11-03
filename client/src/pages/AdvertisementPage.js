import React, {useEffect, useState} from "react";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {useParams} from "react-router-dom"
import useHttp from "../hooks/use-http";
import {body_informations} from "../helpers/httpConfig";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import ContentLeft from "../components/Advertisement/ContentLeft/ContentLeft";
import ContentRight from "../components/Advertisement/ContentRight/ContentRight";
import classes from '../components/Advertisement/ContentRight/ContentRight.module.css';
import BoatMapPosition from "../components/UI/Map/BoatMapPosition";
import LetSuspense from "../components/UI/LetSuspense/LetSuspense";
import {AdvertisementPlaceholder} from "../components/Advertisement/AdvertisementPlaceholder/AdvertisementPlaceholder";

const AdvertisementPage = () => {
    const [visibleContent, setVisibleContent] = useState(false)
    const {boatId} = useParams()
    const {status, data: boat, sendRequest: fetchBoat} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.boat
        fetchBoat({body: body_informations({boatId: boatId})}, transformData)
    }, [fetchBoat, boatId])

    let contentRight = <LoadingSpinner/>
    let contentLeft = <LoadingSpinner/>
    if (status === "completed" && boat) {
        contentRight = (
            <ContentRight
                setVisibleContent={setVisibleContent}
                boatModel={boat.model}
                boatReviews={boat.hasAdvertisement.reviews}
                place={boat.isDocked}
                images={boat.hasAdvertisement.images}
            />
        )
        contentLeft = (
            <ContentLeft
                isVisible={visibleContent}
                images={boat.hasAdvertisement.images}
            />
        )
    }

    return (
        <>
            <LetSuspense
                condition={status === 'completed'}
                placeholder={AdvertisementPlaceholder}
                multiplier={1}
                delay={2000}
            >
                <SplitScreenLayout
                    contentRight={contentRight}
                    contentLeft={contentLeft}
                    rightLayoutContentClassName={classes[`layout-content-right`]}
                />
            </LetSuspense>
        </>
    );
};

export default AdvertisementPage;