var Encore = require('@symfony/webpack-encore');

Encore
// directory where compiled assets will be stored
    .setOutputPath('dist/')
    .setPublicPath('/')

    .addEntry('app', './src/app.js')

    .addStyleEntry('style', './src/app.scss')

    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    // .enableVersioning(Encore.isProduction())

    .enableSassLoader()

    .autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();