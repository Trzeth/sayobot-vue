<template>
  <div class="reset-password-view">
    <div class="input-box-warpper">
      <span>osu! 用户名 / 电子邮箱地址</span>

      <div class="input-warpper">
        <input class="input" placeholder="请输入一项可被识别的信息" v-model="input" v-on:keyup.enter="login" />
        <span class="message" v-show="!(isOsuNameValid||isEmailValid)">Error</span>
      </div>
    </div>
    <a
      class="radius-btn rest-btn"
      v-bind:class="{'valid':isInputValid}"
      v-on:click="sendRequest"
    >找回密码</a>
    <a class="text-btn return-btn" v-on:click="toView(0)">返回登录</a>
  </div>
</template>

<script>
export default {
  name: "reset-password-view",
  data: function() {
    return {
      input: null
    };
  },
  computed: {
    isOsuNameValid: function() {
      let reg = /^[A-Z0-9a-z\[\]\ ]{3,20}$/;
      if (this.input == null) return true;
      else if (reg.test(this.input)) return true;
      return false;
    },
    isEmailValid: function() {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
      if (this.input == null) return true;
      else if (reg.test(this.input)) return true;
      return false;
    },
    isInputValid: function() {
      if (this.input == null) return false;
      return this.isOsuNameValid || this.isEmailValid;
    }
  },
  methods: {
    toView: function(i) {
      this.$emit("update:currentView", i);
    },
    sendRequest: function() {
      if (isInputValid) {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.rest-btn {
  margin-top: 40px;
}
.return-btn {
  margin: 15px 0;
}
</style>