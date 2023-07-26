const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // '/api'로 요청을 보내면, 백엔드인 8080포트(=target)로 요청이 도착
    createProxyMiddleware({
      //target: 'http://10.0.1.196/', // 서버 URL or localhost:설정한포트번호
      target: 'http://localhost:8080', // 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    }),
  );
};
