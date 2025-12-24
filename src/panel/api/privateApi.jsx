import axios from "axios";

export const PrivateApi = axios.create({
    // baseURL: "http://localhost:3001/api"
    baseURL: "/api"
});