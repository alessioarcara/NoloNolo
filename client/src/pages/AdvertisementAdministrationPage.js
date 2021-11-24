import Header from "../components/UI/Header/Header";
import AdvertisementAdministrationCard from "../components/AdvertisementAdministration/AdvertisementAdministrationCard";
import useHttp from "../hooks/use-http";
import {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import {body_shipownerAdvertisements} from "../helpers/httpConfig";

const AdvertisementAdministrationPage = () => {
    const {token} = useContext(AuthContext)
    const {sendRequest} = useHttp(true)

    useEffect(() => {
        sendRequest({body: body_shipownerAdvertisements, token}, resData => resData)
    }, [sendRequest, token])

    return (
        <>
            <Header textTitle="Annunci"/>
            <AdvertisementAdministrationCard/>
        </>
    )
}

export default AdvertisementAdministrationPage
