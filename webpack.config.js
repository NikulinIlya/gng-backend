const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { createProxyMiddleware } = require("http-proxy-middleware");

const getRules = require("./webpack.loaders");
const createProxy = require("./proxy-middleware");

const targetUrl = "https://gng.wine";

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
        proxy: [
            {
                context: ["/api", "/storage"],
                target: targetUrl,
                changeOrigin: true,
                secure: false
            }
        ],
        contentBase: path.resolve(__dirname, "public/build"),
        host: "127.0.0.1",
        port: 8083,
        disableHostCheck: true,
        compress: true,
        historyApiFallback: true
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
