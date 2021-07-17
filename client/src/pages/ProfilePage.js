import React, {useContext, useEffect} from "react";
import AuthContext from "../store/auth-context";
import useHttp from "../hooks/use-http";

const bodyRequest = {
    query: `
    query {
        users {
            _id
            email 
        }
    }`
};

const ProfilePage = () => {

    const authCtx = useContext(AuthContext)

    /* PROVVISORIO */

    const {status, error, data: users, sendRequest: fetchUsers} = useHttp(true)

    useEffect(() => {
        const transformData = resData => resData.users

        fetchUsers({body: bodyRequest, token: authCtx.token}, transformData)
    }, [fetchUsers, authCtx.token])

    let content = <p>No users found.</p>;

    if (status === 'completed' && !error) {
        content =
            <ul> {users.map(user =>
                <li key={user._id}>
                    <p>{user.email}</p>
                </li>)}
            </ul>
    }

    return (
        <div className="centered">
            <h1>Pagina profilo</h1>
            {content}
            <button onClick={authCtx.logout} type="button">Logout</button>
        </div>
    );
};

export default ProfilePage;
