import { isArray } from "lodash";

export default instance => {
    if (typeof instance === "string" || isArray(instance)) {
        return !!!instance.length;
    }
    if (typeof instance === "object") {
        return !!!Object.keys(instance).length;
    }
    if (typeof instance === "boolean") {
        return instance;
    }
};
