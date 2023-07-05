const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:11036';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
   ],
    target: 'https://localhost:5001',
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  },
  {
    context: [
      "/api",
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    },
    pathRewrite:{}
  }
]

module.exports = PROXY_CONFIG;
