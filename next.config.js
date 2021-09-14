const withSvgr = require("next-plugin-svgr");

/**
 * @type {import('next').NextConfig}
 **/

module.exports = withSvgr({
  reactStrictMode: true,
  target: "serverless",
  async rewrites() {
    return [
      // Rewrite everything to `pages/index`
      {
        source: "/:any*",
        destination: "/",
      },
    ];
  },
});
