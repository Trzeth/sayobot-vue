module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/audio": {
        target: "https://cdn.sayobot.cn:25225/preview/",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
