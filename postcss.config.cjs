module.exports = (ctx) => ({
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    autoprefixer: {},
    // Automatically convert pixel to rem
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 4,
      propList: ['*', '!border', '!border-*'],
      selectorBlackList: ['letter-spacing', 'border'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
      exclude: /node_modules/i,
    },
  },
});
