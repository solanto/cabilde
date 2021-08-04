const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

module.exports = {
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
      },
      {
        test: /\.mdx?$/,
        use: [
          "babel-loader",
          "mdx-loader"
        ]
      }
    )

    config.resolve.extensions = [
      ".js",
      ".jsx",
      ".mdx",
      ".json",
      ".yaml",
      ".css",
      ".scss"
    ]

    return config
  }
}
