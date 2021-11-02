import React, {useEffect, useState} from "react";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {useParams} from "react-router-dom"
import useHttp from "../hooks/use-http";
import {body_boat} from "../helpers/httpConfig";
import {body_informations} from "../helpers/httpConfig";
import SlideShow from "../components/UI/SlideShow/SlideShow";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import ContentLeft from "../components/Advertisement/ContentLeft/ContentLeft";
import ContentRight from "../components/Advertisement/ContentRight/ContentRight";
import classes from '../components/Advertisement/ContentRight/ContentRight.module.css';
import BoatMapPosition from "../components/UI/Map/BoatMapPosition";

const AdvertisementPage = () => {
    const [visibleContent, setVisibleContent] = useState(false)
    const { boatId } = useParams()
    const {status, data: boat, sendRequest: fetchBoat} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.boat
        fetchBoat({body: body_informations({boatId: boatId})}, transformData)
    }, [fetchBoat, boatId])

    let contentRight = <LoadingSpinner/>
    if (status === "completed" && boat) {
        contentRight = (<ContentRight setVisibleContent={setVisibleContent}/>)
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