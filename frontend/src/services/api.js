// services/apiClient.js
import axios from "axios";

// Tạo axios instance
const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
});
 const endpoint = {
        user : "http://127.0.0.1:8000/User/",
        product : "http://127.0.0.1:8000/Product/",
    }



export {apiClient, endpoint};