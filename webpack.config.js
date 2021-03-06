var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'popup.js',
        path: path.resolve(__dirname)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015', 'react'] }
                }],
            },
            {
                test: /\.svg$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'url-loader'
                }]
            },
            {
                test: /\.png$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'url-loader'
                }]
            }
        ],
    },
};