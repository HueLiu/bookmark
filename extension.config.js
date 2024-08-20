/** @type {import('extension').FileConfig} */
module.exports = {
  config: config => {
    {
      config.module.rules = [
        {
          test: /\.svg$/i,
          type: "asset",
          resourceQuery: /url/ // *.svg?url
        },
        {
          test: /\.svg$/,
          resourceQuery: { not: [/url/] },
          use: [{ loader: "@svgr/webpack", options: { svgo: false } }]
        },
        ...config.module.rules
      ];
      return config;
    }
  }
};
