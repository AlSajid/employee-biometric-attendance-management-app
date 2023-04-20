/** @type {import('next').NextConfig} */
const NextJSObfuscatorPlugin = require("nextjs-obfuscator");

const nextConfig = {
  reactStrictMode: false,
  
  webpack: (config, { dev }) => {
    if (!dev) {
      config.plugins.push(new NextJSObfuscatorPlugin({
        obfuscateFiles: {
          main: true,
          framework: true,

          app: true,

          error: true,
          pages: true,

          webpack: true,
          buildManifest: true,
        },
        log: true,
      }))
    }

    return config;
  }
}

module.exports = nextConfig