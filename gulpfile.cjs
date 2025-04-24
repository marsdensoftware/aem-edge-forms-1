const { series, src, dest, watch } = require('gulp')
const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

const sass = gulpSass(dartSass)
const plugin = [
  autoprefixer({}),
  pxtorem({
    rootValue: 16,
    unitPrecision: 4,
    propList: ['*', '!border', '!border-*'],
    selectorBlackList: ['letter-spacing', 'border'],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
    exclude: /node_modules/i,
  }),
]

const styleFolder = ['blocks/**/*.scss', 'styles/**/*.scss']

const style = () => {
  return src(styleFolder, { base: './' })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugin))
    .pipe(dest('./'))
}

exports.default = function () {
  watch(styleFolder, series(style))
}
