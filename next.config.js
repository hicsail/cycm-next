const withTM = require('next-transpile-modules')(['@ionic/react', '@ionic/core', '@stencil/core', 'ionicons'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig);
