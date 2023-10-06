import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Replace with your backend server's address and port
      changeOrigin: true,
    })
  );
}
