import Header from "../components/UI/Header/Header";
import AdvertisementAdministrationList from "../components/AdvertisementAdministration/AdvertisementAdministrationList";
import useHttp from "../hooks/use-http";
import {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import {body_shipownerAdvertisements} from "../helpers/httpConfig";
import BackIcon from "../components/UI/icons/BackIcon";

const AdvertisementAdministrationPage = () => {
    const {token} = useContext(AuthContext)
    const {data, sendRequest} = useHttp(true)

    useEffect(() => {
        sendRequest({body: body_shipownerAdvertisements, token}, resData => resData)
    }, [sendRequest, token])

    return (
        <>
            <Header
                backElement={<BackIcon/>}
                textTitle="Annunci"
            />
            <AdvertisementAdministrationList
                advertisements={data ? data.advertisementsByShipowner : []}
                rentals={data ? data.rentalsByShipowner : []}
            />
        </>
    )
}

export default AdvertisementAdministrationPage;
