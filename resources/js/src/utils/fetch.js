// import redaxios from "redaxios";
import axios from "axios";

// const getToken = () => {
//     const token = document.head.querySelector('meta[name="csrf-token"]');
//     return token.content;
// };

axios.defaults.withCredentials = true;
// axios.interceptors.request.use(function(config) {
//     console.log("intercept", config.url);
//     config.headers["X-CSRF-TOKEN"] = getToken();
//     return config;
// });

const instance = axios.create({
    headers: {
        "Content-Type": "application/json"
    },
    responseType: "json",
    withCredentials: true
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
