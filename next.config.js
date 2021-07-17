const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

module.exports = withMDX({
  reactStrictMode: true,
  pageExtensions: ["jsx", "js"],
  images: {
    domains: ["picsum.photos"],
  },
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: "js-yaml-loader",
      }
    )

    return config
  }
})
