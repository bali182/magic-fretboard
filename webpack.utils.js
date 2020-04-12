const autoprefixer = require('autoprefixer')
const precss = require('precss')
const mixnis = require('postcss-sassy-mixins')
const colors = require('postcss-color-function')
const CSSExtractor = require('mini-css-extract-plugin')

const PostCSSConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      precss(),
      mixnis(),
      colors(),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
}

const CSSModuleConfig = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: '[local]__[hash:base64:5]',
  },
}

const CSSConfig = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
  },
}

function scssModuleLoader(extract) {
  return {
    test: /\.module\.scss$/,
    use: [extract ? CSSExtractor.loader : 'style-loader', CSSModuleConfig, PostCSSConfig],
  }
}

function scssLoader(extract) {
  return {
    test: /\.scss$/,
    exclude: /\.module\.scss$/,
    use: [extract ? CSSExtractor.loader : 'style-loader', CSSConfig, PostCSSConfig],
  }
}

module.exports = {
  scssLoader,
  scssModuleLoader,
}
