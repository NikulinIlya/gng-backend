const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { createProxyMiddleware } = require("http-proxy-middleware");

const getRules = require("./webpack.loaders");
const createProxy = require("./proxy-middleware");

const targetUrl = "http://gng.wine";

module.exports = env => ({
    entry: path.resolve(__dirname, "resources/js/src/index.js"),
    output: {
        path: path.join(__dirname, "public/build"),
        filename: "bundles/[name].bundle.js",
        chunkFilename: "chunks/[name].chunk.js",
        publicPath: env.prod ? "/build/" : "/"
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            "@": path.resolve(__dirname, "resources/js/src")
        }
    },
    devServer: {
        // proxy: [
        //     {
        //         context: ["/api", "/storage", "/sanctum"],
        //         target: targetUrl,
        //         changeOrigin: true,
        //         secure: false
        //     }
        // ],
        contentBase: path.resolve(__dirname, "public/build"),
        host: "127.0.0.1",
        port: 8083,
        disableHostCheck: true,
        compress: true,
        historyApiFallback: true,
        after(app) {
            app.use(
                createProxyMiddleware(["/api", "/storage", "/sanctum"], {
                    target: targetUrl,
                    changeOrigin: true,
                    secure: false,
                    cookieDomainRewrite: {
                        "*": ""
                    },
                    onProxyRes(proxyRes, req, res) {
                        Object.keys(proxyRes.headers).forEach(key => {
                            res.append(key, proxyRes.headers[key]);
                        });
                        // console.log(
                        //     "proxyRes.headers!",
                        //     proxyRes.headers.location
                        // );

                        // if (
                        //     proxyRes.headers.location.includes(
                        //         "https://gng.wine/api/lang/en"
                        //     )
                        // ) {
                        //     console.log('proxyRes',proxyRes)
                        // }
                        if (
                            "set-cookie" in proxyRes.headers &&
                            Array.isArray(proxyRes.headers["set-cookie"])
                        ) {
                            console.log('set!!!!')
                            proxyRes.headers["set-cookie"] = proxyRes.headers[
                                "set-cookie"
                            ].map(cookie =>
                                cookie.replace(/[Ss]ecure\s*;?/, "")
                            );
                        }
                    },
                    logLevel: "info"
                })
            );
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Dev Grapes & Grains",
            template: "resources/js/template.html"
        })
    ],
    module: {
        rules: getRules(path)
    }
});
