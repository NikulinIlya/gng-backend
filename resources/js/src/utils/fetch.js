// import redaxios from "redaxios";
import axios from "axios";

axios.interceptors.request.use(function(config) {
    // config.headers["X-CSRF-TOKEN"] =
    // () => {
        console.log('!!!')
        const token = document.head.querySelector('meta[name="csrf-token"]');
        console.log("token", token.content);
    // };
    return config;
});

const instance = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    responseType: "json",
    withCredentials: true,
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
