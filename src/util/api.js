class ApiHelper {
	GetOfficialUri(sid, bid) {
		var src = "https://osu.ppy.sh/beatmapsets/${sid}#osu/${bid}";
		src = src.replace("${sid}", sid);
		src = src.replace("${bid}", bid);
		return src;
	}
	GetDownloadUri(sid, downloadType, downloadServer) {
		// 完整版 https://txy1.sayobot.cn/beatmaps/download/full/${sid}
		// 无视频 https://txy1.sayobot.cn/beatmaps/download/novideo/${sid}
		// MINI  https://txy1.sayobot.cn/beatmaps/download/mini/${sid}
		if (!sid) return;
		if (!downloadType) downloadType = 0;
		if (!downloadServer) downloadServer = 0;

		var src =
			"https://txy1.sayobot.cn/beatmaps/download/${type}/${sid}?server=${server}";

		var typeStr = null;

		switch (downloadType) {
			case 0:
				typeStr = "full";
				break;
			case 1:
				typeStr = "novideo";
				break;
			case 2:
				typeStr = "mini";
				break;
			default:
				typeStr = "full";
				break;
		}
		src = src.replace("${type}", typeStr);
		src = src.replace("${sid}", sid);
		src = src.replace("${server}", downloadServer);

		return src;
	}
	GetPreviewAudioUri(sid) {
		if (!sid) return;

		var src = "https://cdn.sayobot.cn:25225/preview/${sid}.mp3";
		src = src.replace("${sid}", sid);

		return src;
	}
	GetPreviewBackgroundUri(sid) {
		var src =
			"https://cdn.sayobot.cn:25225/beatmaps/${sid}/covers/cover.jpg";
		return src.replace("${sid}", sid);
	}
	GetServerListUri() {
		return "https://api.sayobot.cn/static/servers";
	}
	GetBeatmapInfo(sid, forceBid = false) {
		var src = "https://api.sayobot.cn/v2/beatmapinfo?0=${sid}";
		src = src.replace("${sid}", sid);
		if (forceBid) {
			src += "&1=1";
		}
		return src;
	}
}

let _ = new ApiHelper();

export default _;
