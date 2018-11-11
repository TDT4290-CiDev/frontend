module.exports = {
  type: 'react-app',
  babel: {
    plugins: ['react-hot-loader/babel'],
  },
  webpack: {
    define: { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
  },
};
