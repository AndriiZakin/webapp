module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
        enforce: 'pre'
    });

    return config;
};

const { override, useEslintRc, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');

module.exports = override(
    useEslintRc(path.resolve(__dirname, '.eslintrc')),
    addDecoratorsLegacy()
);