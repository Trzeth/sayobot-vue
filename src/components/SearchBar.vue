<template>
	<v-combobox
		v-model="model"
		:search-input.sync="searchText"
		item-text="value"
		filled
		chips
		deletable-chips
		class="ml-6"
		label="Search Everything"
		multiple
		flat
		clearable
		solo-inverted
		:hide-no-data="!isCommand"
		hide-details
		prepend-inner-icon="mdi-magnify"
	>
		<template v-slot:no-data>
			<v-list-item v-if="commandMode != -1">
				<v-list-item-content>
					<v-list-item-title>
						{{ hintTitle[commandMode] }}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ hintSubtitle[commandMode] }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-list-item v-else v-for="n in (0, 6)" :key="n">
				<v-list-item-content>
					<v-list-item-title>
						{{ hintTitle[n] }}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ hintSubtitle[n] }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</template>
		<template v-slot:selection="data">
			<v-chip
				v-if="data.item.mode != -1"
				close
				@click:close="remove(data.item)"
			>
				{{
					modes[data.item.mode] +
						" " +
						data.item.low +
						"~" +
						data.item.high
				}}
			</v-chip>
			<v-label v-else light color="white">
				{{ data.item.key }}
			</v-label>
		</template>
		<template v-slot:item="data">
			<template v-if="typeof data.item !== 'object'">
				<v-list-item-content v-text="data.item"></v-list-item-content>
			</template>
			<template v-else>
				<v-list-item-content>
					<v-list-item-title
						v-html="data.item.name"
					></v-list-item-title>
					<v-list-item-subtitle
						v-html="data.item.group"
					></v-list-item-subtitle>
				</v-list-item-content>
			</template>
		</template>
	</v-combobox>
</template>

<script>
export default {
	name: "search-bar",
	data: function() {
		return {
			hasInputText: false,
			searchText: null,
			modes: ["Stars", "AR", "OD", "CS", "HP", "Length", "BPM"],
			modesLowcase: ["stars", "ar", "od", "cs", "hp", "length", "bpm"],
			hintTitle: [
				":stars 0~10",
				":ar 0~10",
				":od 0~10",
				":cs 0~10",
				":hp 0~10",
				":length 0~999",
				":bpm 0~9999"
			],
			hintSubtitle: [
				"限定谱面的星数",
				"限定谱面的 Approach Rate",
				"限定谱面的 Overall Difficulty",
				"限定谱面的 Circle Size",
				"限定谱面的 HP Drain",
				"限定谱面的时长",
				"限定谱面的 BPM"
			],
			model: [],
			items: []
			// people: [
			// 	{
			// 		name: "Star",
			// 		value: ":star",
			// 		group: "Group 1",
			// 		avatar: srcs[1]
			// 	}
			// ],
		};
	},
	computed: {
		isCommand() {
			return this.getCommand(this.searchText);
		},
		isCommandValid() {
			if (!this.isCommand()) return false;

			return this.getCommandValid(this.searchText) ? true : false;
		},
		commandMode() {
			var match = this.getMatch(this.searchText);
			if (match) {
				return this.modeToInt(match.mode);
			}
			return -1;
		}
	},
	watch: {
		model(val, prev) {
			if (val.length === prev.length) return;
			if (prev && val.length < prev.length) {
				var last = this.model[this.model.length - 1];
				if (last && last.mode != -1) this.hasInputText = false;
			}
			if (typeof this.model[this.model.length - 1] === "string") {
				var str = this.model.pop();
				var v;
				if (!this.getCommand(str)) {
					v = {
						key: str,
						mode: -1
					};
					if (!this.hasInputText) {
						this.model.push(v);
						this.hasInputText = true;
					} else {
						this.model.pop();
						this.model.push(v);
					}
				} else {
					v = this.getCommandValid(str);
					if (v) {
						if (!this.hasInputText) {
							this.model.push(v);
						} else {
							var text = this.model.pop();
							this.model.push(v);
							this.model.push(text);
						}
					} else {
						// 莫名bug 如果 searchText 不变 赋值后就会被清空
						// 如果是 （:od） 的话 我就真的没办法了
						// 或者是 输到一般失去焦点的情况

						v = this.getMatch(str);
						this.searchText = ":";
						if (this.modeToInt(v.mode) > 0)
							this.searchText += v.mode;
					}
				}
			}
		}
	},
	methods: {
		modeToInt(str) {
			return this.modesLowcase.indexOf(str);
		},
		getMatch(str, reg = /:(\w+)([^\d](\d+)?[^\d](\d+)?)?/g) {
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
			var reg = /:(\w+)?(.(\d+)?.(\d+)?)?/g;

			if (!reg.test(str)) {
				return false;
			}

			return true;
		},
		getCommandValid(str) {
			var match = this.getMatch(str, /:(\w+)[^\d](\d+)[^\d](\d+)/g);

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
			const index = this.model.indexOf(item);
			if (index >= 0) this.model.splice(index, 1);
		}
	}
};
</script>

<style></style>
