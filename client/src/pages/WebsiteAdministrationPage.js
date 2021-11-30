import WebsiteAdministration from "../components/WebsiteAdministration/WebsiteAdministration";
import useHttp from "../hooks/use-http";
import {useCallback, useContext, useEffect, useState} from "react";
import {body_rentals} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import {parseMutationResponse} from "../helpers/Utils/utils";

const WebsiteAdministrationPage = () => {
    const [rentals, setRentals] = useState([])
    const {sendRequest} = useHttp(true)
    const {logout, token} = useContext(AuthContext)

    const handleMutationAdministrationRentals = useCallback((body, applyData) =>
            sendRequest({body, token}, parseMutationResponse(setRentals, applyData))
        , [sendRequest, token])

    useEffect(() => {
        sendRequest({
            body: body_rentals,
            token
        }, resData => setRentals(resData.rentals))
    }, [sendRequest, token])

    return (
        <>
            <WebsiteAdministration
                rentals={rentals}
                handleMutationAdministrationRentals={handleMutationAdministrationRentals}
                logout={logout}
            />
        </>
    )
}

export default WebsiteAdministrationPage
