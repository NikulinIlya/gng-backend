const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const targetUrl = "http://gng.wine";

module.exports = env => ({
    entry: path.resolve(__dirname, "resources/js/src/index.js"),
    output: {
        path: path.join(__dirname, "public/build"),
        filename: "bundles/[name].bundle.js",
        chunkFilename: "chunks/[name].chunk.js",
        publicPath: env.prod ? "/build/" : "/"
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 200,
        ignored: /node_modules/
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
                changeOrigin: true
            }
        ],
        contentBase: path.resolve(__dirname, "public/build"),
        host: "0.0.0.0",
        port: 8083,
        compress: true,
        historyApiFallback: true,
        // https: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        (_ =>
            env.prod
                ? () => {}
                : new HtmlWebpackPlugin({
                      title: "Dev Grapes & Grains",
                      template: "resources/js/template.html"
                  }))()
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "resources/js/src"),
                query: {
                    presets: ["@babel/env", "@babel/react"],
                    plugins: [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                corejs: false
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            prependData: `@import 'styles/variables'; @import 'styles/mixins';`,
                            sassOptions: {
                                includePaths: [
                                    path.resolve(
                                        __dirname,
                                        "resources/js/src/assets"
                                    )
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "images/[name].[ext]"
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    }
});
