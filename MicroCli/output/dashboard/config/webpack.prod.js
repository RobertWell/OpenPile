const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dashboard/latest/'
        //Public Path: 放到server的folder位置，也是build後script的位置。
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            remotes: {
                
                
                heatmap: `heatmap@${domain}/heatmap/latest/remoteEntry.js`,  
                
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
