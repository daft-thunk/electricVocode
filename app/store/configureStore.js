// @flow

// NOTE:
// For now, we're using the same store for both builds.
// See commented out code in first block.

if (process.env.NODE_ENV === 'production') {
  // module.exports = require('./configureStore.prod'); // eslint-disable-line global-require
  module.exports = require('./index'); // eslint-disable-line global-require
} else {
  module.exports = require('./index'); // eslint-disable-line global-require
}

