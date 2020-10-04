module.exports = path => [
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
                            path.resolve(__dirname, "resources/js/src/assets")
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
];
