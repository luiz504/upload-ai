/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  webpack(config) {
    config.ignoreWarnings = [
      { module: /node_modules\/@ffmpeg\/ffmpeg\/dist\/esm\/worker\.js/ },
      { file: /node_modules\/@ffmpeg\/ffmpeg\/dist\/esm\/worker\.js/ },
      { module: /node_modules\/@ffmpeg\/ffmpeg\/dist\/esm\/classes\.js/ },
      { file: /node_modules\/@ffmpeg\/ffmpeg\/dist\/esm\/classes\.js/ },
      { module: /node_modules\/@ffmpeg\/ffmpeg\/dist\/esm\/index\.js/ },
      { file: /node_modules\/@ffmpeg\/ffmpeg\/dist\/esm\/index\.js/ },
    ]
    return config
  },
}
