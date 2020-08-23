module.exports = {
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    parallel: require('os').cpus().length > 1,//是否为 Babel 或 TypeScript 使用 thread-loader
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8888,
        https: false,
        hotOnly: false,
        // 设置代理
        proxy: {
            '/api': {
              target: 'http://localhost:3000/', //对应自己的接口
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
            }
          }, 
       
    },   
    // 基本路径
    publicPath: './', //部署应用包时的基本 URL
    outputDir: 'dist', // 输出文件目录
    assetsDir: '',//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本。设置为true可以使用template
    productionSourceMap: false,//生产环境是否生成 sourceMap 文件
    lintOnSave: true,
    chainWebpack(config) {
        config.resolve.alias
        //     .set('style', resolve('public/style'))
        config.output.filename('js/[name].[hash:16].js');//hash值设置
        config.output.chunkFilename('js/[id].[hash:16].js');
        // config.output.filename('css/[name].[hash:16].css');//hash值设置
    },
    configureWebpack: () => {
    },

    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
