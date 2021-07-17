import axios from "axios";
import {GRAPHQL_API_URL} from "../helpers/constants";

const http = axios.create({
    method: "post",
    withCredentials: true,
    baseURL: GRAPHQL_API_URL
});

export default http;

