import redaxios from "redaxios";
import axios from "axios"

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
