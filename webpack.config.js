module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader',
        options: {
	      hotReload: false // disables Hot Reload
	    }
      },
    ],
  },
};