const path = require('path');
module.exports = {
    //define entry point
    entry: './src/app.js',
    //define output point
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module:{
        rules:[{
            test:/\.js$/,
            exclude:/(node_modules)/,
            loader:'babel-loader'
        }]
    },
    mode: 'development'
}