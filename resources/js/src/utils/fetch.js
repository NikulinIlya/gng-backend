import redaxios from "redaxios";

const instance = redaxios.create({
    headers: {
        test: document.title
    }
});

export default instance
