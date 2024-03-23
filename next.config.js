/** @type {import('next').NextConfig} */
dotenv = require('dotenv')
const nextConfig = {};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}
// 连接mysql 确保dotenv被加载
dotenv.config()
// export default nextConfig;
