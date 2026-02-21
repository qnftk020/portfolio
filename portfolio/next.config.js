/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages에서 커스텀 도메인 없이 배포할 경우:
  // basePath: '/repository-name',
  // assetPrefix: '/repository-name/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
