module.exports = {
	runtimeCompiler: true,
	devServer: {
		proxy: {
			"/audio": {
				target: "https://cdn.sayobot.cn:25225/preview/",
				ws: true,
				changeOrigin: true
			},
			"/api/register": {
				target: "https://account.sayobot.cn/register",
				ws: true,
				changeOrigin: true
			},
			"api/login": {
				target: "https://account.sayobot.cn/login",
				ws: true,
				changeOrigin: true
			}
		}
	}
};
