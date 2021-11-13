import UserDetailsHeader from "../components/UserDetails/Header/UserDetailsHeader";
import UserInfo from "../components/UserDetails/UserInfo/UserInfo";
import UserDetails from "../components/UserDetails/UserDetails";
import {body_user} from "../helpers/httpConfig";
import {useContext, useEffect} from "react";
import useHttp from "../hooks/use-http";
import AuthContext from "../store/auth-context";

const UserDetailsPage = () => {
    const {token} = useContext(AuthContext)
    const {data: user, sendRequest: fetchUser} = useHttp(false)

    useEffect(() => {
        const transformDataUser = resData => resData.user
        fetchUser({body: body_user, token: token}, transformDataUser)
    }, [fetchUser, token])

    return (
        <>
            <UserDetailsHeader/>
            <UserInfo
                user={user}
            />
            <UserDetails
                user={user}
            />
        </>
    );
};

export default UserDetailsPage;
