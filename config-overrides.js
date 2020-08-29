const rewireAliases = require('react-app-rewire-aliases');
const { paths } = require('react-app-rewired');
const path = require('path');

module.exports = function override(config, env) {
    config = rewireAliases.aliasesOptions({
        '@': path.resolve(__dirname, paths.appSrc),
        '@axios': path.resolve(__dirname, `${paths.appSrc}/@axios/`),
        '@history': path.resolve(__dirname, `${paths.appSrc}/@history/`),
        '@lodash': path.resolve(__dirname, `${paths.appSrc}/@lodash/`),
        '@hooks': path.resolve(__dirname, `${paths.appSrc}/@theme/hooks/`),
        '@utils': path.resolve(__dirname, `${paths.appSrc}/@theme/utils/`),
        '@components': path.resolve(__dirname, `${paths.appSrc}/app/components/`),
    })(config, env);
    return config;
};
