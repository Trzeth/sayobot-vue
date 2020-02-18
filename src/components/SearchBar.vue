<template>
	<v-combobox
		v-model="tags"
		v-on:keydown.enter="OnKeyDown"
		:search-input.sync="inputText"
		:hide-no-data="!isCommand"
		@click:clear="clear"
		filled
		chips
		deletable-chips
		auto-select-first
		label="Search Everything"
		multiple
		flat
		clearable
		solo-inverted
		hide-details
		prepend-inner-icon="mdi-magnify"
	>
		<template v-slot:no-data>
			<v-list-item-group color="primary" multiple v-model="model">
				<v-list-item v-if="commandMode != -1">
					<v-list-item-content>
						<v-list-item-title>
							{{ others[commandMode].hintTitle }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ others[commandMode].hintSubtitle }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
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
				v-if="data.item.mode != -1"
				close
				@click:close="remove(data.item)"
			>
				{{ data.item.hintTitle }}
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

			model: [],
			tags: [],

			selectedSubTypes: [],
			selectedModes: [],
			selectedClasses: [],
			selectedOthers: [],
			subTypes: [
				// subType
				{
					hintTitle: ":title",
					hintSubtitle: "限定关键词为标题",
					isActive: false
				},
				{
					hintTitle: ":artist",
					hintSubtitle: "限定关键词为艺术家"
				},
				{
					hintTitle: ":source",
					hintSubtitle: "限定关键词为出处"
				},
				{
					hintTitle: ":creator",
					hintSubtitle: "限定关键词为作图者"
				},
				{
					hintTitle: ":version",
					hintSubtitle: "限定关键词为难度"
				},
				{
					hintTitle: ":tags",
					hintSubtitle: "限定关键词为标签"
				}
			],
			modes: [
				// mode
				{
					hintTitle: ":std",
					hintSubtitle: "限定谱面为标准模式"
				},
				{
					hintTitle: ":taiko",
					hintSubtitle: "限定谱面为太鼓模式"
				},
				{
					hintTitle: ":ctb",
					hintSubtitle: "限定谱面为接水果模式"
				},
				{
					hintTitle: ":mania",
					hintSubtitle: "限定谱面为钢琴模式"
				}
			],
			classes: [
				// class
				{
					hintTitle: ":ranked&approved",
					hintSubtitle: "限定谱面为 Ranked & Approved 状态"
				},
				{
					hintTitle: ":qualified",
					hintSubtitle: "限定谱面为 Qualified 状态"
				},
				{
					hintTitle: ":loved",
					hintSubtitle: "限定谱面为 Loved 状态"
				},
				{
					hintTitle: ":pending&wip",
					hintSubtitle: "限定谱面为 Pending & WIP 状态"
				},
				{
					hintTitle: ":graveyard",
					hintSubtitle: "限定谱面为 Graveyard 状态"
				}
			],
			others: [
				{
					mode: "Stars",
					hintTitle: ":stars 0~10",
					hintSubtitle: "限定谱面的星数",
					pos: -1
				},
				{
					mode: "AR",
					hintTitle: ":ar 0~10",
					hintSubtitle: "限定谱面的 Approach Rate",
					pos: -1
				},
				{
					mode: "OD",
					hintTitle: ":od 0~10",
					hintSubtitle: "限定谱面的 Overall Difficulty",
					pos: -1
				},
				{
					mode: "CS",
					hintTitle: ":cs 0~10",
					hintSubtitle: "限定谱面的 Circle Size",
					pos: -1
				},
				{
					mode: "HP",
					hintTitle: ":hp 0~10",
					hintSubtitle: "限定谱面的 HP Drain",
					pos: -1
				},
				{
					mode: "Length",
					hintTitle: ":length 0~999",
					hintSubtitle: "限定谱面的时长",
					pos: -1
				},
				{
					mode: "BPM",
					hintTitle: ":bpm 0~9999",
					hintSubtitle: "限定谱面的 BPM",
					pos: -1
				}
			]
		};
	},
	computed: {
		isCommand() {
			return this.getCommand(this.inputText);
		},
		isCommandValid() {
			if (!this.isCommand()) return false;

			return this.getCommandValid(this.inputText) ? true : false;
		},
		commandMode() {
			var match = this.getMatch(this.inputText);
			if (match) {
				var i = this.modeToInt(match.mode);
				return i;
			}
			return -1;
		}
	},
	watch: {
		inputText(val, pre) {
			this.isUpdatingSelectingObj = true;

			this.model = this.searchSelectedActiveObj();
		},
		model(val, pre) {
			if (!this.isUpdatingSelectingObj) {
				if (!pre || val.length > pre.length) {
					if (this.isEnterPress) {
						this.isEnterPress = false;
						this.inputText = null;
					}
					var v = val[val.length - 1];
					v.isActive = true;
				} else if (val.length < pre.length) {
					pre[pre.length - 1].isActive = false;
				}

				this.tags = this.searchAllActiveObj();
				if (this.searchText)
					this.tags.push({
						mode: -1,
						key: this.searchText
					});
			}
			this.isUpdatingSelectingObj = false;
		},
		tags(val, pre) {
			//输入框删除情况
			if (pre && val.length < pre.length) {
				if (pre.length > 0) {
					if (pre[pre.length - 1].mode == -1) {
						this.searchText = null;
					} else {
						pre[pre.length - 1].isActive = false;
						this.model = this.searchSelectedActiveObj();
					}
				}
			}
		}
	},
	methods: {
		searchObj(str, arr, type) {
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
					e.type = type;
					selected.push(e);
				}
			});
			return selected;
		},
		searchSelectedActiveObj() {
			var active = [];

			this.selectedSubTypes = this.searchObj(
				this.inputText,
				this.subTypes,
				0
			);
			active = active.concat(
				this.searchActiveObjHelper(this.selectedSubTypes)
			);

			this.selectedModes = this.searchObj(this.inputText, this.modes, 1);

			active = active.concat(
				this.searchActiveObjHelper(this.selectedModes)
			);
			this.selectedClasses = this.searchObj(
				this.inputText,
				this.classes,
				2
			);
			active = active.concat(
				this.searchActiveObjHelper(this.selectedClasses)
			);
			this.selectedOthers = this.searchObj(
				this.inputText,
				this.others,
				3
			);
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
		OnKeyDown() {
			// 当 input 仅为高级搜索表达式 并 在输入框为空时按下回车
			// 输入文本状态下的处理在  watch -> model 里
			if (!this.inputText) this.$emit("search", this.model);
			else {
				if (this.isCommand) {
					this.isEnterPress = true;
				} else {
					this.searchText = this.inputText;
					this.tags.push({
						mode: -1,
						key: this.searchText
					});
					this.inputText = null;
				}
			}
		},
		modeToInt(str) {
			return this.others.findIndex(ele => ele.mode.toLowerCase() == str);
		},
		getMatch(str, reg = /::(\w+)([^\d](\d+)?[^\d](\d+)?)?/g) {
			if (!reg.test(str)) return null;
			reg.lastIndex = 0;

			var match = reg.exec(str);
			if (match.length == 2) {
				return { mode: match[1] };
			} else {
				var mode = match[1].toLowerCase();
				var low = Number.parseInt(match[2]);
				var high = Number.parseInt(match[3]);
				return { mode: mode, low: low, high: high };
			}
		},
		getCommand(str) {
			var reg = /::?(\w+)?(.(\d+)?.(\d+)?)?/g;

			if (!reg.test(str)) {
				return false;
			}

			return true;
		},
		getCommandValid(str) {
			var match = this.getMatch(str, /::(\w+)[^\d](\d+)[^\d](\d+)/g);

			if (!match) return null;
			if (this.modeToInt(match.mode) < 0) return null;
			if (match.low > match.high) return null;

			return {
				mode: this.modeToInt(match.mode),
				low: match.low,
				high: match.high
			};
		},
		remove(item) {
			console.log("remove");
			item.isActive = false;
			const index = this.model.indexOf(item);
			if (index >= 0) this.tags.splice(index, 1);

			this.model = this.searchSelectedActiveObj();
		},
		clear() {
			this.tags.forEach(e => {
				e.isActive = false;
			});
			this.tags = [];

			this.model = this.searchSelectedActiveObj();
		}
	}
};
</script>

<style></style>
