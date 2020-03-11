/* eslint-disable global-require */
module.exports = {
  plugins: [
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('autoprefixer')({
      browsers: ['last 10 versions', 'Firefox >= 20', 'Android >= 4.0', 'iOS >= 8']
    }),
    // eslint-disable-next-line import/no-extraneous-dependencies
    require('stylelint')({})
  ]
};
