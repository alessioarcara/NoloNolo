import React, {useContext} from "react";
import AuthContext from "../store/auth-context";

const ProfilePage = () => {

    const authCtx = useContext(AuthContext)

    /* PROVVISORIO */

    return (
        <div className="centered">
            <h1>Pagina profilo</h1>
            <button onClick={authCtx.logout} type="button">Logout</button>
        </div>
    );
};

export default ProfilePage;
