var path = require("path");
var webpack = require('webpack');
// 生成 html 文件，
var HtmlWebpackPlugin = require('html-webpack-plugin');
// css 代码分割
var MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env, argv) => {


    return {

        mode: 'development', // 模式

        entry: './src/index.js',

        // 多入口
        // entry:{
        //     'index':['./src/index.js'],
        //     'index2':['./src/index2.js'],
        // },

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            // 动态获取设置输出文件
            // filename: '[name].js',
        },


        module: {
            rules: [
                //对css 文件处理  代码分割不要用 style-loader
                {
                    test: /\.css$/,

                    use: [
                        MiniCssExtractPlugin.loader,
                        {loader: "css-loader"}
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {loader: "css-loader"},
                        {loader: "less-loader"}
                    ]
                },

                // 对 js 或者 jsx 文件处理
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/, // 除了node_modules 模块
                    use: {
                        loader: 'babel-loader'
                    }
                },
            ]
        },

        plugins: [

            // 设置全局变量
            new webpack.DefinePlugin({
                // JSON.stringify 防止取全局变量时候不是字符串
                GROBAL_ENV: env == 'development' ? JSON.stringify("development") : JSON.stringify("production"),
            }),


            new HtmlWebpackPlugin({
                template: './src/index.html'    // 模板文件位置
            }),

            // hot 检测文件改动替换plugin
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),

            // css 代码 分割
            new MiniCssExtractPlugin({
                filename: "[name].[chunkhash:8].css",
                chunkFilename: "[id].css"
            })


        ],

        // webpack-dev-server 配置搭建本地测试环境
        devServer: {
            port: 8000,//控制端口
            hot: true
        },
    }
}
