// babel.config.js
const ReactCompilerConfig = {
    target: '18' // '17' | '18' | '19'
};

module.exports = function(api) {
    // Cache the returned value forever and don't call this function again.
    api.cache(true);

    return {
        presets: [
            '@babel/preset-react'
        ],
        plugins: [
            ['babel-plugin-react-compiler', ReactCompilerConfig],
        ],
    };
};