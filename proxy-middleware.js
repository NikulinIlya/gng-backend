const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (target) => {
    return createProxyMiddleware(["/api", "/storage", "/sanctum"], {
        target,
        changeOrigin: true,
        followRedirects: true,
        secure: false,
        // cookieDomainRewrite: {
        //     "*": "*"
        // },
        // onProxyRes(proxyRes) {
        //     console.log("proxyRes.headers!!!!!!!!!", proxyRes.headers);
        //     if (
        //         "set-cookie" in proxyRes.headers &&
        //         Array.isArray(proxyRes.headers["set-cookie"])
        //     ) {
        //         proxyRes.headers["set-cookie"] = proxyRes.headers[
        //             "set-cookie"
        //         ].map(cookie => cookie.replace(/[Ss]ecure\s*;?/, ""));
        //     }
        // },
        logLevel: "warn"
    });
};
