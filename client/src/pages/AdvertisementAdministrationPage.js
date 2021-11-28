import Header from "../components/UI/Header/Header";
import AdvertisementAdministrationList from "../components/AdvertisementAdministration/AdvertisementAdministrationList";
import useHttp from "../hooks/use-http";
import {useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "../store/auth-context";
import {body_shipownerAdvertisements} from "../helpers/httpConfig";
import BackIcon from "../components/UI/icons/BackIcon";
import {parseMutationResponse} from "../helpers/Utils/utils";

const AdvertisementAdministrationPage = () => {
    const {token} = useContext(AuthContext)
    const {sendRequest} = useHttp(true)

    const [{advertisements, rentals}, setAdvertisements] = useState({
        advertisements: [],
        rentals: []
    })

    const handleMutationAdvertisement = useCallback((body, applyData) =>
        sendRequest({body, token}, parseMutationResponse(setAdvertisements, applyData)),
        [sendRequest, token])

    useEffect(() => {
        sendRequest({
            body: body_shipownerAdvertisements,
            token
        }, resData => setAdvertisements({
            advertisements: resData.advertisementsByShipowner ? resData.advertisementsByShipowner : [],
            rentals: resData.rentalsByShipowner ? resData.rentalsByShipowner : [],
        }))
    }, [sendRequest, token])

    return (
        <>
            <Header
                backElement={<BackIcon/>}
                textTitle="Annunci"
            />
            <AdvertisementAdministrationList
                advertisements={advertisements}
                rentals={rentals}
                onMutateAdvertisement={handleMutationAdvertisement}
            />
        </>
    )
}

export default AdvertisementAdministrationPage;
