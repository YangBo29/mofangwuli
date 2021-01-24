/*
 * Author: vicky
 * Date: 2020-06-02 14:02:15
 * LastEditors:
 * LastEditTime: 2020-06-29 18:07:37
 */

// ref: https://umijs.org/config/
import { resolve } from 'path';

export default {
    treeShaking: true, //用于描述移除 JavaScript 上下文中的未引用代码
    //   disableRedirectHoist: true,//禁用 redirect 上提。
    // devtool: 'source-map',//生成map文件
    targets: {
        //兼容浏览器版本
        // ie: 11,
    },
    define: {
        'process.env': {
            DEPLOY: 'public', // 公测：public 私有：private
        },
    },
    // routes: [
    //     {
    //         path: '/',
    //         component: '../layouts/index',
    //         routes: [{ path: '/', component: '../pages/index' }],
    //     },
    // ],
    plugins: [
        // ref: https://umijs.org/plugin/umi-plugin-react.html
        [
            'umi-plugin-react',
            {
                dva: true,
                dynamicImport: {
                    webpackChunkName: true,
                    // loadingComponent: './components/Loading/index.js' 加载组件
                },
                title: '魔方物理',
                dll: true,
                routes: {
                    exclude: [
                        /models\//,
                        /services\//,
                        /model\.(t|j)sx?$/,
                        /service\.(t|j)sx?$/,
                        /components\//,
                    ],
                },
                scripts: [
                    // { src: '' },引入外部文件地址
                ],
            },
        ],
    ],
    alias: {
        '@': resolve(__dirname, '../src'),
        '@utils': resolve(__dirname, '../src/utils'),
        // 组件库
        '@components': resolve(__dirname, '../src/components'),
        // 全局services
        '@services': resolve(__dirname, '../src/services'),
        // 全局models
        '@models': resolve(__dirname, '../src/models'),
        // request请求
        '@http': resolve(__dirname, '../src/utils/request.js'),
        // 全局·组件初始化数据
        '@cmpInitData': resolve(__dirname, '../componentInitData'),
        // 项目公共资源文件
        '@public': resolve(__dirname, '../public'),
        // 静态图片资源
        '@assets': resolve(__dirname, '../src/assets'),
        // 全局·规则
        '@rules': resolve(__dirname, '../src/rules'),
    },
    urlLoaderExcludes: [/\.(png|jpe?g|gif|svg)$/],
    proxy: {
        '/apis': {
            target: 'https://pre-api.raykite.com',
            // target: 'http://test.api.raykite.com',
            changeOrigin: true,
            pathRewrite: { '^/apis': '' },
        },
        // '/apis': {
        //     target: 'http://111.229.79.141/',
        //     changeOrigin: true,
        // },
    },
    theme: './src/theme/theme_white.js',
    hash: true, //路径添加hash值，部署防止缓存
    chainWebpack(config) {
        config.plugin('extract-css').tap(options => {
            let newOpts = [...options];
            newOpts[0].filename = 'mofangwuli.[hash:8].css';
            return newOpts;
        });
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)$/)
            .use('url-loader')
            .tap(options => {
                return {
                    ...options,
                    limit: 100, //可以修改大小，超出大小不会转成base64，会在static文件下
                    name: 'static/[name][hash:8].[ext]',
                };
            })
            .loader('url-loader');
        //更改生产环境打包的的js文件名称
        config.when(process.env.NODE_ENV === 'production', config => {
            config.output.filename('mofangwuli.[hash:8].js');
        });
    },
};
