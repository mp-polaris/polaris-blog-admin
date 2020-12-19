module.exports = {
  devServer: {
    proxy: {
      '/user': {
        target: 'http://localhost:8085',
        changeOrigin: true
      },
      '/admin': {
        target: 'http://localhost:8085',
        changeOrigin: true
      }
    }
  }
};
