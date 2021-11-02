import React, {useEffect, useState} from "react";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {useRouteMatch} from "react-router-dom"
import useHttp from "../hooks/use-http";
import {body_boat} from "../helpers/httpConfig";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import ContentLeft from "../components/Advertisement/ContentLeft/ContentLeft";
import ContentRight from "../components/Advertisement/ContentRight/ContentRight";
import classes from '../components/Advertisement/ContentRight/ContentRight.module.css';

const AdvertisementPage = () => {
    const match = useRouteMatch()
    const {status, data: boat, sendRequest: fetchBoat} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.boat
        fetchBoat({body: body_boat({boatId: match.params.boatId})}, transformData)
    }, [fetchBoat, match.params.boatId])

    let contentRight = <LoadingSpinner/>
    if (status === "completed" && boat) {
        contentRight = (
            <div>
                <p>{boat.model}</p>
                <p>{boat.hasAdvertisement.description}</p>
            </div>
        )

    }

    return (
        <SplitScreenLayout
            contentLeft={boat && <ContentLeft isVisible={visibleContent} images={boat.hasAdvertisement.images}/>}
            contentRight={contentRight}
            rightLayoutContentClassName={classes[`layout-content-right`]}
        />
    );
};

export default AdvertisementPage;