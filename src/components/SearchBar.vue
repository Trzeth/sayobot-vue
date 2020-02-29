<template>
	<v-combobox
		v-model="tag"
		v-on:keydown.enter="OnKeyDown"
		v-on:blur="UnFocus"
		v-on:focus="OnFocus"
		:search-input.sync="inputText"
		:hide-no-data="!isCommand"
		:label="labelText"
		append-icon=""
		@click:clear="clear"
		filled
		chips
		deletable-chips
		auto-select-first
		multiple
		flat
		clearable
		solo-inverted
		hide-details
		prepend-inner-icon="mdi-magnify"
	>
		<template v-slot:no-data>
			<v-list-item-group color="primary" multiple v-model="model">
				<template v-if="otherCommandMode != -1">
					<v-subheader>高级选项</v-subheader>
					<v-list-item disabled color="black">
						<v-list-item-icon></v-list-item-icon>

						<v-list-item-content>
							<v-list-item-title>
								{{ others[otherCommandMode].hintTitle }}
							</v-list-item-title>
							<v-list-item-subtitle>
								{{ others[otherCommandMode].hintSubtitle }}
							</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</template>
				<template v-else>
					<template>
						<v-subheader>关键词</v-subheader>
						<v-list-item
							v-for="n in selectedSubTypes"
							:key="n.hintTitle"
							:value="n"
						>
							<template v-slot:default="{ active, toggle }">
								<v-list-item-action>
									<v-checkbox
										:input-value="active"
										@click="toggle"
									></v-checkbox>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>
										{{ n.hintTitle }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ n.hintSubtitle }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-list-item>

						<v-divider></v-divider>
						<v-subheader>模式</v-subheader>
						<v-list-item
							v-for="n in selectedModes"
							:value="n"
							:key="n.hintTitle"
						>
							<template v-slot:default="{ active, toggle }">
								<v-list-item-action>
									<v-checkbox
										:input-value="active"
										@click="toggle"
									></v-checkbox>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>
										{{ n.hintTitle }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ n.hintSubtitle }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-list-item>

						<v-divider></v-divider>
						<v-subheader>图谱状态</v-subheader>
						<v-list-item
							v-for="n in selectedClasses"
							:value="n"
							:key="n.hintTitle"
						>
							<template v-slot:default="{ active, toggle }">
								<v-list-item-action>
									<v-checkbox
										:input-value="active"
										@click="toggle"
									></v-checkbox>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>
										{{ n.hintTitle }}
									</v-list-item-title>
									<v-list-item-subtitle>
										{{ n.hintSubtitle }}
									</v-list-item-subtitle>
								</v-list-item-content>
							</template>
						</v-list-item>

						<v-divider></v-divider>
						<v-subheader>高级选项</v-subheader>
						<v-list-item
							v-for="n in selectedOthers"
							:key="n.hintTitle"
							ripple
							color="black"
							disabled
						>
							<v-list-item-icon></v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>
									{{ n.hintTitle }}
								</v-list-item-title>
								<v-list-item-subtitle>
									{{ n.hintSubtitle }}
								</v-list-item-subtitle>
							</v-list-item-content>
						</v-list-item>
					</template>
				</template>
			</v-list-item-group>
		</template>
		<template v-slot:selection="data">
			<v-chip
				v-if="data.item.type != -1"
				close
				@click:close="remove(data.item)"
			>
				<v-avatar left
					><v-icon>{{ getIconStr(data.item.type) }}</v-icon>
				</v-avatar>
				<template v-if="data.item.type == 3">
					{{
						data.item.mode +
							" " +
							getRangeStr(data.item.low, data.item.high)
					}}
				</template>
				<template v-else>
					{{ data.item.tagText }}
				</template>
			</v-chip>
			<v-label v-else class="d-inline-block mr-2">
				{{ data.item.key }}
			</v-label>
		</template>
	</v-combobox>
</template>

<script>
export default {
	name: "search-bar",
	data: function() {
		return {
			inputText: null,
			searchText: null,
			isEnterPress: false,
			isUpdatingSelectingObj: false,

			labelText: "Search Everything",
			model: [],
			tag: [],

			selectedSubTypes: [],
			selectedModes: [],
			selectedClasses: [],
			selectedOthers: [],
			subTypes: [
				// subType
				{
					tagText: "Title",
					hintTitle: ":title",
					hintSubtitle: "限定关键词为标题",
					type: 0
				},
				{
					tagText: "Artist",
					hintTitle: ":artist",
					hintSubtitle: "限定关键词为艺术家",
					type: 0
				},
				{
					tagText: "Source",
					hintTitle: ":source",
					hintSubtitle: "限定关键词为出处",
					type: 0
				},
				{
					tagText: "Creator",
					hintTitle: ":creator",
					hintSubtitle: "限定关键词为作图者",
					type: 0
				},
				{
					tagText: "Version",
					hintTitle: ":version",
					hintSubtitle: "限定关键词为难度",
					type: 0
				},
				{
					tagText: "Tags",
					hintTitle: ":tags",
					hintSubtitle: "限定关键词为标签",
					type: 0
				}
			],
			modes: [
				// mode
				{
					tagText: "Std",
					hintTitle: ":std",
					hintSubtitle: "限定谱面为标准模式",
					type: 1
				},
				{
					tagText: "Taiko",
					hintTitle: ":taiko",
					hintSubtitle: "限定谱面为太鼓模式",
					type: 1
				},
				{
					tagText: "CTB",
					hintTitle: ":ctb",
					hintSubtitle: "限定谱面为接水果模式",
					type: 1
				},
				{
					tagText: "Mania",
					hintTitle: ":mania",
					hintSubtitle: "限定谱面为钢琴模式",
					type: 1
				}
			],
			classes: [
				// class
				{
					tagText: "Ranked & Approved",
					hintTitle: ":ranked&approved",
					hintSubtitle: "限定谱面为 Ranked & Approved 状态",
					type: 2
				},
				{
					tagText: "Qualified",
					hintTitle: ":qualified",
					hintSubtitle: "限定谱面为 Qualified 状态",
					type: 2
				},
				{
					tagText: "Loved",
					hintTitle: ":loved",
					hintSubtitle: "限定谱面为 Loved 状态",
					type: 2
				},
				{
					tagText: "Pending & WIP",
					hintTitle: ":pending&wip",
					hintSubtitle: "限定谱面为 Pending & WIP 状态",
					type: 2
				},
				{
					tagText: "Graveyard",
					hintTitle: ":graveyard",
					hintSubtitle: "限定谱面为 Graveyard 状态",
					type: 2
				}
			],
			others: [
				{
					mode: "Star",
					hintTitle: ":star 0~10",
					hintSubtitle: "限定谱面的星数",
					min: 0,
					max: 10,
					type: 3
				},
				{
					mode: "AR",
					hintTitle: ":ar 0~10",
					hintSubtitle: "限定谱面的 Approach Rate",
					min: 0,
					max: 10,
					type: 3
				},
				{
					mode: "OD",
					hintTitle: ":od 0~10",
					hintSubtitle: "限定谱面的 Overall Difficulty",
					min: 0,
					max: 10,
					type: 3
				},
				{
					mode: "CS",
					hintTitle: ":cs 0~10",
					hintSubtitle: "限定谱面的 Circle Size",
					min: 0,
					max: 10,
					type: 3
				},
				{
					mode: "HP",
					hintTitle: ":hp 0~10",
					hintSubtitle: "限定谱面的 HP Drain",
					min: 0,
					max: 10,
					type: 3
				},
				{
					mode: "Length",
					hintTitle: ":length 0~999",
					hintSubtitle: "限定谱面的时长",
					min: 0,
					max: 999,
					type: 3
				},
				{
					mode: "BPM",
					hintTitle: ":bpm 0~9999",
					hintSubtitle: "限定谱面的 BPM",
					min: 0,
					max: 9999,
					type: 3
				}
			]
		};
	},
	computed: {
		isCommand() {
			return this.getCommand(this.inputText);
		},
		otherCommandMode() {
			var match = this.getMatch(
				this.inputText,
				/^:(\w+)[^\d\w]((\d+)?[^\d](\d+)?)?/g
			);
			if (match) {
				var i = this.modeToInt(match.mode);
				return i;
			}
			return -1;
		}
	},
	watch: {
		inputText(val) {
			if (val) {
				this.isUpdatingSelectingObj = true;
				this.updateModel();
			}
		},
		model(val, pre) {
			if (!this.isUpdatingSelectingObj) {
				if (this.isEnterPress) {
					this.isEnterPress = false;
					this.inputText = null;
				}

				if (!pre || val.length > pre.length) {
					var v = val[val.length - 1];
					v.isActive = true;
				} else if (val.length < pre.length) {
					pre.forEach(e => {
						if (!val.includes(e)) {
							e.isActive = false;
							this.isUpdatingSelectingObj = true;
						}
					});
				}

				this.updateTag();
			} else {
				this.isUpdatingSelectingObj = false;
			}
		},
		tag(val, pre) {
			//输入框删除情况
			if (pre && val.length < pre.length) {
				if (pre.length > 0) {
					if (pre[pre.length - 1].type == -1) {
						this.searchText = null;
					} else {
						pre[pre.length - 1].isActive = false;
						this.updateModel();
					}
				}
			}
		}
	},
	methods: {
		searchObj(str, arr) {
			var selected = [];
			const hasValue = val => (val != null ? val : "");

			arr.forEach(e => {
				const text = hasValue(e.hintTitle);
				const query = hasValue(str);

				if (
					text
						.toString()
						.toLowerCase()
						.indexOf(query.toString().toLowerCase()) > -1
				) {
					selected.push(e);
				}
			});
			return selected;
		},
		searchSelectedActiveObj() {
			var active = [];

			this.selectedSubTypes = this.searchObj(
				this.inputText,
				this.subTypes
			);
			active = active.concat(
				this.searchActiveObjHelper(this.selectedSubTypes)
			);

			this.selectedModes = this.searchObj(this.inputText, this.modes);

			active = active.concat(
				this.searchActiveObjHelper(this.selectedModes)
			);
			this.selectedClasses = this.searchObj(this.inputText, this.classes);
			active = active.concat(
				this.searchActiveObjHelper(this.selectedClasses)
			);
			this.selectedOthers = this.searchObj(this.inputText, this.others);
			active = active.concat(
				this.searchActiveObjHelper(this.selectedOthers)
			);
			return active;
		},
		searchAllActiveObj() {
			var arr = [];
			arr = arr.concat(this.searchActiveObjHelper(this.subTypes));
			arr = arr.concat(this.searchActiveObjHelper(this.modes));
			arr = arr.concat(this.searchActiveObjHelper(this.classes));
			arr = arr.concat(this.searchActiveObjHelper(this.others));
			return arr;
		},
		searchActiveObjHelper(arr) {
			return arr.filter(e => e.isActive);
		},
		updateModel() {
			this.model = this.searchSelectedActiveObj();
		},
		updateTag() {
			this.tag = this.searchAllActiveObj();

			if (this.searchText) {
				this.tag.push({
					type: -1,
					key: this.searchText
				});
			}
		},
		OnKeyDown() {
			// 当 input 仅为高级搜索表达式 并 在输入框为空时按下回车
			// 输入文本状态下的处理在  watch -> model 里

			if (!this.inputText) this.search();
			else {
				var match = null;

				if (this.getCommand(this.inputText)) {
					match = this.getOtherCommandValid(this.inputText);
					if (!match) {
						// Handler in watch->model
						this.isEnterPress = true;
					} else {
						var v = this.others[match.mode];
						v.isActive = true;
						v.low = match.low;
						v.high = match.high;
						this.updateTag();
						this.inputText = null;
					}
				} else {
					//处理链接

					match = this.getBeatmapDetail(this.inputText);
					if (match) {
						if (match.sid) {
							this.$router.push({
								name: "home",
								params: {
									queryMode: "beatmapset",
									sid: match.sid
								}
							});
						} else {
							this.$router.push({
								name: "home",
								params: {
									queryMode: "beatmapset",
									sid: match.bid
								},
								query: {
									bid: "true"
								}
							});
						}

						return;
					}

					if (this.searchText) {
						this.searchText += this.inputText;
						this.tag[this.tag.length - 1].key = this.searchText;
					} else {
						this.searchText = this.inputText;
						this.tag.push({
							type: -1,
							key: this.searchText
						});
					}

					this.inputText = null;

					this.search();
				}
			}
		},
		OnFocus() {
			this.labelText = "输入 : 显示筛选器";
		},
		UnFocus() {
			this.labelText = "Search Everything";
		},
		modeToInt(str) {
			return this.others.findIndex(ele => ele.mode.toLowerCase() == str);
		},
		getMatch(str, reg) {
			if (!reg.test(str)) return null;
			reg.lastIndex = 0;

			var match = reg.exec(str);
			if (match.length == 2) {
				return { mode: match[1] };
			} else {
				var mode = match[1].toLowerCase();
				var low = match[2] ? Number.parseInt(match[2]) : null;
				var high = match[3] ? Number.parseInt(match[3]) : null;
				return { mode: mode, low: low, high: high };
			}
		},
		getCommand(str) {
			var reg = /^:(\w+[^\d\w](\d+)[^\d](\d+))?/g;

			if (!reg.test(str)) {
				return false;
			}

			return true;
		},
		getOtherCommandValid(str) {
			var match = this.getMatch(str, /^:(\w+)[^\d\w](\d+)([^\d](\d+))?$/);
			if (!match) return null;

			var pos = this.modeToInt(match.mode);

			if (pos < 0) return null;
			if (match.low == null && !match.high == null) return null;

			if (match.low != null && match.high != null) {
				if (match.low > match.high) return null;
				if (match.low < this.others[pos].min) return null;
				if (match.high > this.others[pos].max) return null;

				return {
					mode: pos,
					low: match.low,
					high: match.high
				};
			} else {
				var v = match.low != null ? match.low : match.high;
				if (v < this.others[pos].min || v > this.others[pos].max)
					return null;

				return {
					mode: pos,
					low: v,
					high: v
				};
			}
		},
		getIconStr(type) {
			switch (type) {
				case 0:
					return "mdi-alpha-k-circle";
				case 1:
					return "mdi-alpha-m-circle";
				case 2:
					return "mdi-alpha-s-circle";
				case 3:
					return "mdi-alpha-o-circle";
			}
		},
		getRangeStr(low, high) {
			if (high > low) {
				return low + "~" + high;
			} else if (high == low) {
				return high;
			}
		},
		getBeatmapDetail(uri) {
			var osuRegex = /^((http|https):\/{2})?osu.ppy.sh\/([bsd])\/(beatmap?b=)?(\d+)([&?]m=[0-3])?$/;
			var osuNewRegex = /^((http|https):\/{2})?osu.ppy.sh\/beatmapsets\/(\d+)\/?(#(\w+)(\/(\d+))?)?$/;
			var shortLinkRegex = /^(s|m|b)(\d+)$/;

			var match = uri.match(osuRegex);
			var sid = null,
				bid = null;

			if (match) {
				if (match[3] == "b") {
					bid = match[5];
				} else {
					sid = match[5];
				}
			} else if ((match = uri.match(osuNewRegex))) {
				sid = match[3];
				bid = match[7];
			} else if ((match = uri.match(shortLinkRegex))) {
				if (match[1] == "b") {
					bid = match[2];
				} else {
					sid = match[2];
				}
			}

			return sid || bid ? { sid: sid, bid: bid } : null;
		},
		remove(item) {
			item.isActive = false;
			const index = this.tag.indexOf(item);
			if (index >= 0) this.tag.splice(index, 1);
			this.updateModel();
		},
		clear() {
			this.tag.forEach(e => {
				e.isActive = false;
			});
			this.searchText = null;
			this.tag = [];
			this.updateModel();
		},
		filterToInt(arr) {
			var sum = 0;

			for (var i = 0; i != arr.length; i++) {
				if (arr[i].isActive) sum += Math.pow(2, i);
			}
			return sum ? sum : null;
		},
		otherToStr() {
			var arr = this.others;

			var isActive = false;
			var str = "";

			for (var i = 0; i != arr.length; i++) {
				var item = arr[i];
				var low, high;
				if (item.isActive) {
					isActive = true;
					low = item.low;
					high = item.high;
				} else {
					low = item.min;
					high = item.max;
				}

				str += item.mode.toLowerCase() + ":" + low + "~" + high + ",";
			}
			str += "end";

			return isActive ? str : null;
		},
		search() {
			var param = {
				subType: null,
				mode: null,
				class: null,
				other: null,
				keyword: this.searchText
			};

			param.subType = this.filterToInt(this.subTypes);
			param.mode = this.filterToInt(this.modes);
			param.class = this.filterToInt(this.classes);
			param.other = this.otherToStr();

			if (
				!param.subType &&
				!param.mode &&
				!param.class &&
				!param.other &&
				!param.keyword
			)
				return;

			this.$emit("search", param);

			this.$gtag.event("Search", {
				event_category: "SearchBar",
				event_label:
					0 + param.subType + param.mode + param.class + param.other >
					0
						? "With Filter"
						: "Normal"
			});
		}
	}
};
</script>

<style></style>
