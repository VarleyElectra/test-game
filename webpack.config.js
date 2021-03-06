const path = require('path');

module.exports = {
  mode: "development",
  entry:  __dirname + '/src/app.js',
  output: {
    path: path.resolve(__dirname, 'build'), 
    filename: 'bundle.js' 
  },
  module: {
    rules: [
      {
        test: /\.(png|json)$/,
        include: /src\/images/,
        use: 'file-loader',
      },
    ],
  },
};