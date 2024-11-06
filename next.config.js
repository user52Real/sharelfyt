/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three", "@floating-ui/react", "@floating-ui/dom"],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['www.shareflyt.xyz', 'shareflyt.xyz', 'shareflyt.vercel.app'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  modularizeImports: {
    '@floating-ui/react': {
      transform: '@floating-ui/react/dist/{{member}}'
    },
    '@floating-ui/dom': {
      transform: '@floating-ui/dom/dist/{{member}}'
    }
  }, 
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Correct externals configuration
    if (!config.externals) {
      config.externals = [];
    }

    // Handle Three.js and WebSocket-related externals
    if (isServer) {
      config.externals.push({
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
      });
    }

    // Handle OrbitControls properly
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/OrbitControls': 'three/examples/jsm/controls/OrbitControls',
      'bidi-js': false, 
    };

    // Client-side fallbacks
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }

    return config;
  },
  // CORS headers configuration
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ],
      },
      {
        // Proper content type for manifest
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          }
        ],
      }
    ];
  },
};

// Sentry configuration
const { withSentryConfig } = require("@sentry/nextjs");

// Sentry configuration options
const sentryWebpackPluginOptions = {
  org: "shareflyt",
  project: "shareflyt",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  hideSourceMaps: true,
  disableLogger: true,
  transpileClientSDK: true,
  automaticVercelMonitors: true,
};

// Export the configuration
module.exports = withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions
);