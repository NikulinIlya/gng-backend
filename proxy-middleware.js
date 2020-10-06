const { createProxyMiddleware } = require("http-proxy-middleware");

function relayRequestHeaders(proxyReq, req) {
    // Object.keys(req.headers).forEach(function(key) {
    //     proxyReq.setHeader(key, req.headers[key]);
    // });
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
}

function relayResponseHeaders(proxyRes, req, res) {
    Object.keys(proxyRes.headers).forEach(function(key) {
        res.append(key, proxyRes.headers[key]);
    });
}

module.exports = target => {
    return createProxyMiddleware(["/api", "/storage", "/sanctum"], {
        target,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
            "*": "localhost"
        },
        onProxyReq: relayRequestHeaders,
        onProxyRes: relayResponseHeaders,
        logLevel: "warn"
    });
};
