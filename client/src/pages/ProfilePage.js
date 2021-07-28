import React, {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

const bodyRequest = {
    query: `
    query {
        user {
            _id
            email
        }
    }`
};

const ProfilePage = () => {

    const authCtx = useContext(AuthContext)

    /* PROVVISORIO */

    const {status, error, data: user, sendRequest: fetchUser} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.user

        fetchUser({body: bodyRequest, token: authCtx.token}, transformData)
    }, [fetchUser, authCtx.token])

    let content = <p>No users found.</p>;

    if (status === 'completed' && !error) {
        content = (
            <div>
                <h3>{user.email}</h3>
            </div>
        )
    }

    return (
        <div className="centered">
            <h1>Profilo</h1>
            {content}
            <button onClick={authCtx.logout} type="button">Logout</button>
        </div>
    );
};

export default ProfilePage;
