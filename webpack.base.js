/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable new-cap */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 在node中，有全局变量process表示的是当前的node进程。
// process.env包含着关于系统环境的信息。
// NODE_ENV是用户一个自定义的变量，在webpack中它的用途是来判断当前是生产环境或开发环境。
// 我们可以通过 cross-env 将 NODE_ENV=development 写入 npm run dev的指令中，从而注入NODE_ENV变量。
const devMode = process.env.NODE_ENV !== 'production';
const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);

module.exports = {
  entry: {
    index: pathResolve('src/js/index.js'),
    main: pathResolve('src/js/main.js'),
  },
  output: {
    path: pathResolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
          },
        },
        enforce: 'pre',
        include: [pathResolve('src')],
      },
      {
        test: /\.(jsx?)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href'],
          },
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:7].[ext]',
              limit: 8192,
              outputPath: 'static/font',
            },
          },
        ],
      },
      {
        test: /\.less$/, // less-loader将less转为css --> postcss autoprefixer-->css-loader提取css资源-->使用style-laoder通过<style>标签插入<head>
        use: [
          devMode
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode
            ? 'style-loader'
            : {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../',
              },
            },
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8kb的文件则转为dataURL:Base64形式，大于8kb则交由file-loader处理，生成新图片并打包
              name: '[name].[hash:7].[ext]',
              outputPath: 'static/img',
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new htmlWebpackPlugin({ // 该插件可以自动生成HTML文件，并导入静态资源
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      filename: pathResolve('dist/index.html'),
      template: pathResolve('src/index.html'),
      chunks: ['manifest', 'index'],
    }),
    // eslint-disable-next-line new-cap
    new htmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 移除空格
        removeAttributeQuotes: true, // 移除引号
        removeComments: true, // 移除注释
      },
      filename: pathResolve('dist/main.html'),
      template: pathResolve('src/main.html'),
      chunks: ['manifest', 'main'],
    }),
  ],
};
