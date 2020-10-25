import axios from "axios";

const protectedUrls = [
    "/api/user-info",
    "/api/update-user-info",
    "/api/logout",
    "/api/orders",
    "/api/orders/create",
    "/api/password/reset"
];

const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    responseType: "json",
    withCredentials: true
});

instance.interceptors.request.use(function(config) {
    if (protectedUrls.includes(config.url)) {
        
        const token = localStorage.getItem("token");
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const to = async promise => {
    try {
        const resp = await promise;
        return [null, await resp];
    } catch (err) {
        return [err];
    }
};

export default instance;
