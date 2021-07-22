import {useContext, useMemo} from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import {body_refresh} from "../helpers/httpConfig"
import http from "./axiosConfig"

const AxiosMiddleware = ({children}) => {

    const authCtx = useContext(AuthContext)

    useMemo(() => {
        http.interceptors.response.use(
            async res => res,
            async error => {

                const errorMessage = await error.response.data.errors[0].message;

                if (errorMessage.includes('Unauthenticated')) {
                    try {
                        const res = await http({data: body_refresh})
                        const resData = res.data.data.refreshToken;

                        const tokenData = resData.token;
                        authCtx.login(tokenData)

                        const config = error.config;
                        config.headers['Authorization'] = "Bearer " + tokenData
                        return axios.request(config)
                    } catch (err) {
                        authCtx.logout()
                        throw new Error("'Invalid or expired refresh token.'")
                    }
                }
                return Promise.reject(error)
            })
    }, [authCtx])

    return children
}

export default AxiosMiddleware
