import WebsiteAdministration from "../components/WebsiteAdministration/WebsiteAdministration";
import useHttp from "../hooks/use-http";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {body_rentals} from "../helpers/httpConfig";
import AuthContext from "../store/auth-context";
import {parseMutationResponse} from "../helpers/Utils/utils";
import Notification from "../components/UI/Notification/Notification";

const WebsiteAdministrationPage = () => {
    const [rentals, setRentals] = useState([])
    const {status, data: problem, error, sendRequest} = useHttp(true)
    const {logout, token} = useContext(AuthContext)
    const isEditingRentals = useRef(false)

    const handleMutationAdministrationRentals = useCallback((body, applyData) => {
        sendRequest({body, token}, parseMutationResponse(setRentals, applyData))
        isEditingRentals.current = true
    }, [sendRequest, token])

    useEffect(() => {
        sendRequest({
            body: body_rentals,
            token
        }, resData => setRentals(resData.rentals))
    }, [sendRequest, token])

    return (
        <>
            {isEditingRentals.current && status === 'completed' && (!problem && !error) &&
                <Notification message="Operazione riuscita" status="success"/>
            }
            {isEditingRentals.current && status === 'completed' && (problem || error) &&
                <Notification message="Operazione fallita" status="error"/>
            }
            <WebsiteAdministration
                rentals={rentals}
                handleMutationAdministrationRentals={handleMutationAdministrationRentals}
                logout={logout}
            />
        </>
    )
}

export default WebsiteAdministrationPage
