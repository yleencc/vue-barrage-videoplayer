const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
let publicPath = process.env.NODE_ENV === "prodution" ? "/" : "./";
module.exports = {
  // 基本路径
  publicPath: publicPath,
  assetsDir: "assets",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
    // svg图标配置
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "[name]",
      })
      .end();
  },
  devServer: {
    // 关闭host检查
    disableHostCheck: true,
    /*
        overlay: {
          warnings: true,
          errors: true
        },
    */
    port: 8080,
    proxy: {
      "/api_bilibili": {
        target: "https://api.bilibili.com",
        secure: true,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api_bilibili": "/",
        },
      },
      "/files": {
        target: "https://yleen.cc",
        secure: true,
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
