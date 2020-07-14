const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "resources/js/src/index.js"),
    output: {
        path: path.join(__dirname, "public/build"),
        filename: "bundles/[name].bundle.js",
        chunkFilename: "chunks/[name].chunk.js",
        publicPath: "/"
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
        contentBase: path.resolve(__dirname, "public/build"),
        host: "0.0.0.0",
        compress: true,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Grapes & Grains',
            template: "resources/views/index.blade.php"
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: path.resolve(__dirname, "resources/js/src"),
                query: {
                    presets: ["@babel/env", "@babel/react"]
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
};
