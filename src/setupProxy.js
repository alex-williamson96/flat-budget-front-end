const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // Change this to match your backend API path
    createProxyMiddleware({
      target: 'http://127.0.0.1:5173/',  // Change this to your backend URL
      changeOrigin: true,
    })
  );
};