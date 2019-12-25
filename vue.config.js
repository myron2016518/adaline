const path = require('path');

const PAGE_ENTRIES = [
  'index',
  'manage',
];

module.exports = {
  pages: {
    /** 回放 **/
    index: {
      entry: 'src/index/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    /** 日志审核后台 **/
    manage: {
      entry: 'src/manage/main.js',
      template: 'public/manage.html',
      filename: 'manage.html',
      chunks: ['chunk-vendors', 'chunk-common', 'manage']
    },
  },
  outputDir: 'adaline',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/proxy_adaline': {
        // target: "http://aittest.x431.com",           // 测试
        target: "http://ait.golo365.com",               // 正式
        // target: "http://aitus.golo365.com",          // 海外
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy_adaline': ''
        }
      },
      '/proxy_user_center': {
        // target: "https://cntestglinner.x431.com",       // 测试
        target: "https://cnglinner.dbscar.com",            // 正式
        // target: "https://usglinner.dbscar.com",         // 海外
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/proxy_user_center': ''
        }
      },
    }
  },
  chainWebpack (config) {
    PAGE_ENTRIES.forEach(entryName => {
      config.plugins.delete(`preload-${entryName}`);
      config.plugins.delete(`prefetch-${entryName}`);
    });

    config.resolve.alias
      .set('index', resolve('src/index'))
      .set('manage', resolve('src/manage'));
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: 'chunk-vendors',
            minChunks: PAGE_ENTRIES.length,
            test: /node_modules/,
            priority: -10,
            chunks: 'initial'
          },
          common: {}
        },
      },
    },
  },
  // publicPath: '/adaline/',
  publicPath: '.',
  filenameHashing: true,
  productionSourceMap: false,
}

function resolve (dir) {
  return path.join(__dirname, dir);
}
