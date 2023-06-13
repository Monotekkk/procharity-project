const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        main: "./src/index.js",
        layout: "./src/layout.js",
        content: "./src/content.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "",
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, "./dist"),
        open: true,
        compress: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "ui-kit.html",
            template: "./src/ui-kit.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "lk-competencies.html",
            template: "./src/lk-competencies.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "lk-motivation.html",
            template: "./src/lk-motivation.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "lk-personal-data.html",
            template: "./src/lk-personal-data.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "lk-portfolio.html",
            template: "./src/lk-portfolio.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "lk-social.html",
            template: "./src/lk-social.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "registration.html",
            template: "./src/registration.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "registration-first-step.html",
            template: "./src/registration-first-step.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "registration-new-volunteer.html",
            template: "./src/registration-new-volunteer.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "settings-change-password.html",
            template: "./src/settings-change-password.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "settings-notifications.html",
            template: "./src/settings-notifications.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "settings-profile.html",
            template: "./src/settings-profile.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "registration-contacts.html",
            template: "./src/registration-contacts.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "registration-nko-final.html",
            template: "./src/registration-nko-final.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "registration-nko-hello.html",
            template: "./src/registration-nko-hello.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: "account-access-inviting.html",
            template: "./src/account-access-inviting.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: 'registration-documents-and-files.html',
            template: './src/registration-documents-and-files.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: "account-contacts.html",
            template: "./src/account-contacts.html",
            inject: "body",
        }),
        new HtmlWebpackPlugin({
            filename: 'sidebar-registration.html',
            template: './src/sidebar-registration.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'donation_firstVisit.html',
            template: './src/donation_firstVisit.html',
        }),
      new HtmlWebpackPlugin({
            filename: 'lk-nko-account.html',
            template: './src/lk-nko-account.html',
             inject: 'body'
        }),
         new HtmlWebpackPlugin({
            filename: 'lk-nko-document-and-file.html',
            template: './src/lk-nko-document-and-file.html',
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
<<<<<<< HEAD
            filename: 'donate.html',
            template: './src/donate.html',
=======
            filename: 'registration-nko-account.html',
            template: './src/registration-nko-account.html',
>>>>>>> b9f162d26ba77a4297ad1df753bb4b560f16dd2b
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
    ],
};
