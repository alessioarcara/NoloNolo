import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useHttp from "../../hooks/use-http";
import {body_informations} from "../../helpers/httpConfig";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import ContentRight from "./ContentRight/ContentRight";
import ContentLeft from "./ContentLeft/ContentLeft";
import LetSuspense from "../UI/LetSuspense/LetSuspense";
import {AdvertisementPlaceholder} from "./AdvertisementPlaceholder/AdvertisementPlaceholder";
import SplitScreenLayout from "../UI/Layout/SplitScreenLayout/SplitScreenLayout";
import classes from "./Avertisement.module.css";

const Advertisement = () => {
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
                ownerEmail={boat.owner.email}
                ownerAvatar={boat.owner.avatar}
                boatDescription={boat.hasAdvertisement.description}
                boatYard={boat.yard}
                boatLength={boat.length}
                boatMaxCapacity={boat.maximumCapacity}
                boatType={boat.boatType}
            />
        )
        contentLeft = (
            <ContentLeft
                isVisible={visibleContent}
                images={boat.hasAdvertisement.images}
                boatPosition={boat.isDocked.coordinates}
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

export default Advertisement;