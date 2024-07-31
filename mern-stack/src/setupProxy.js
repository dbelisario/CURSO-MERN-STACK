const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/user', // Prefijo de la ruta para las solicitudes al backend
    createProxyMiddleware({
      target: 'http://localhost:5000', // URL del servidor backend
      changeOrigin: true, // Permite que el servidor backend pueda ver la solicitud original
    })
  );
};