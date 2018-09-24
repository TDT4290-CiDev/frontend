module.exports = {
  type: 'react-app',
  webpack: {
    extra: {
      entry: `${__dirname}/src/index.jsx`,
      resolve: {
        extensions: ['.jsx', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
    },
  },
};
