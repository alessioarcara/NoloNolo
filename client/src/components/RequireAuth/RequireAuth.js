import {useContext} from "react";
import AuthContext from "../../store/auth-context";
import {Navigate} from "react-router-dom";

const RequireAuth = ({children}) => {
    const {isLoggedIn} = useContext(AuthContext)

    if (!isLoggedIn) {
        return <Navigate to="/auth" replace/>;
    }

    return children;
}

export default RequireAuth;
