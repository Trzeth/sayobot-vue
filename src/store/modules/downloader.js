const state = {
	beatmapset: [],
};

const getters = {
	complete: (state) => {
		state.beatmapset.filter((beatmap) => beatmap.status == 2);
	},
	downloading: (state) => {
		state.beatmapset.filter((beatmap) => beatmap.status == 1);
	},
	error: (state) => {
		state.beatmapset.filter((beatmap) => beatmap.status == -1);
	},
};

const mutations = {
	add(state, beatmapInfo) {
		if (
			state.beatmapset.findIndex((map) => map.sid == beatmapInfo.sid) >= 0
		)
			return;

		state.beatmapset.push(beatmapInfo);
	},
	set(state, beatmapset) {
		state.beatmapset = beatmapset;
	},
	removeBySid(state, sid) {
		state.splice(
			state.beatmapset.findIndex((item) => item.sid == sid),
			1
		);
	},
	clear(state) {
		state.beatmap = [];
	},
	setData(state, sid, data) {
		state.beatmapset.find((item) => item.sid == sid).data = data;
	},
	setProgress(state, sid, progress) {
		state.beatmapset.find((item) => item.sid == sid).progress = progress;
	},
	setStatus(state, sid, status) {
		state.beatmapset.find((item) => item.sid == sid).status = status;
	},
};

const actions = {};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
