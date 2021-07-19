const path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require('dotenv-webpack');


var config = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|map)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env'] }
                    
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            allChunks: true
        }), 
    	new Dotenv()
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    devtool: 'source-map'
}

var frontendConfig = Object.assign({}, config, {
	
	mode: 'development',
    entry: {
        app: path.resolve(__dirname, './frontend/web/js/app.js'),
        style: path.resolve(__dirname, './frontend/web/css/style.less'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './frontend/web/bundle'),
    },
});

/*   "babel": {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-typescript",
      "@babel/preset-react"
    ],
    "plugins": [
      "@babel/proposal-class-properties",
      "@babel/proposal-object-rest-spread"
    ]
  },
var frontendReact = Object.assign({}, config, {
    entry: {
        app: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js')
    },
    output: {
        filename: '[name]-react.js',
        path: path.resolve(__dirname, './frontend/web/bundle'),
    },
});

var frontendReactDom = Object.assign({}, config, {
    entry: {
        app: path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
    },
    output: {
        filename: '[name]-react-dom.js',
        path: path.resolve(__dirname, './frontend/web/bundle'),
    },
});

var frontendGMaps = Object.assign({}, config, {
    entry: {
    	app: path.resolve(__dirname, './node_modules/@react-google-maps/api/dist/reactgooglemapsapi.umd.production.min.js'),
    },
    output: {
        filename: '[name]-gmaps.js',
        path: path.resolve(__dirname, './frontend/web/bundle'),
    },
});
*/

var backendConfig = Object.assign({}, config, {
	mode: 'development',
    entry: {
        app: path.resolve(__dirname, './backend/web/js/app.js'),
        style: path.resolve(__dirname, './backend/web/css/style.less'),
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './backend/web/bundle'),
    },
});


module.exports = [
    frontendConfig, backendConfig, /*frontendReact, frontendReactDom, frontendGMaps,*/
];

