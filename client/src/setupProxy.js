const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            ['/auth/register', '/auth/login'], { target: 'http://localhost:5000' }
        ));
}