const modDev = process.env.NODE_ENV !== 'production' 
const webpack = require('webpack')
const terserPlugin = require('terser-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modDev ? 'development' : 'production',
    entry:'./src/principal.js',
    output:{
        filename: 'principal.js',
        path: __dirname + '/public'
    },

    devServer:{
        contentBase:"./public",
        port:9000
    },

    optimization: {
        minimizer: [
            new optimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
         new miniCssExtractPlugin({
             filename:"estilo.css"
         }),
         new terserPlugin({
             parallel: true,
             terserOptions: {
                 ecma: 6,
             },
         }),
    ],
    module:{
        rules: [{
            test: /\.s?[ac]ss$/,
            use:[
                 miniCssExtractPlugin.loader,
                //'style-loader', /*Adicona CSS a DOM injetando a tag <style>*/
                'css-loader', /*interpreta @import, url()... */
                'sass-loader',
             ]
        }, {
            test:/\.(png|svg|jpg|gif)$/,
            use:['file-loader']
        }]
    }
}