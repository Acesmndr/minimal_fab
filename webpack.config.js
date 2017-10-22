const path = require('path');
module.exports = {
    entry: './main.js',
      module: {
        loaders: [
          { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
      },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    }
  };