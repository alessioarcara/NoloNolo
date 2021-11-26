import {useContext, useEffect, useState} from "react";
import AuthContext from "../../store/auth-context";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const RequireAuth = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const {isLoggedIn} = useContext(AuthContext)

    useEffect(() => {
        setTimeout(
            () => setIsLoading(false),
            1000
        )
    }, [])

    if (isLoggedIn) return children
    return (
        isLoading ?
            <div style={{position: "absolute", top: "50%", left: "50%"}}>
                <LoadingSpinner/>
            </div> :
            isLoggedIn ?
                children :
                <Navigate to="/auth" replace/>
    )
}

export default RequireAuth;
