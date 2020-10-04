const { createProxyMiddleware } = require("http-proxy-middleware");

function relayRequestHeaders(proxyReq, req) {
    Object.keys(req.headers).forEach(function(key) {
        proxyReq.setHeader(key, req.headers[key]);
    });
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
