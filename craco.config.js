const webpack = require('webpack');

module.exports = {
    webpack: {
        plugins: {
            add: [
                new webpack.ProvidePlugin({
                    Buffer: ['buffer', 'Buffer']
                }),
                new webpack.ProvidePlugin({
                    process: 'process/browser'
                })
            ]
        },
        configure: {
            resolve: {
                fallback: {
                    stream: require.resolve('stream-browserify'),
                    zlib: require.resolve('browserify-zlib'),
                    util: require.resolve('util/'),
                    buffer: require.resolve('buffer/'),
                    assert: require.resolve('assert/')
                }
            }
        }
    }
};
