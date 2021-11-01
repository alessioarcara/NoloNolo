import React, {useEffect} from "react";
import SplitScreenLayout from "../components/UI/Layout/SplitScreenLayout/SplitScreenLayout";
import {useRouteMatch} from "react-router-dom"
import useHttp from "../hooks/use-http";
import {body_informations} from "../helpers/httpConfig";
import SlideShow from "../components/UI/SlideShow/SlideShow";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import BoatMapPosition from "../components/UI/Map/BoatMapPosition";

const AdvertisementPage = () => {
    const match = useRouteMatch()
    const {status, data: boat, sendRequest: fetchBoat} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.boat
        fetchBoat({body: body_informations({boatId: match.params.boatId})}, transformData)
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
            contentLeft={boat &&
                // <BoatMapPosition boatPosition={boat.isDocked.coordinates}/>
                <SlideShow images={boat.hasAdvertisement.images}/>
            }
            contentRight={contentRight}
        />
    );
};

export default AdvertisementPage;
