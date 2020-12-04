module.exports = {
    devServer: {
        proxy: 'http://10.1.237.10/yutang_api/public/index.php/api/'
    },
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 75,
                        propList: ['*'],
                        selectorBlackList: ['van']
                    })
                ]
            }
        }
    }
}