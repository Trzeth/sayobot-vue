<template>
  <div class="register-view">
    <div class="input-box-warpper">
      <span>账号</span>
      <div class="input-warpper">
        <input
          class="input"
          placeholder="请输入用户名"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          v-model="username"
          v-on:keyup.enter="login"
        />
        <span class="message" v-show="!isUserNameValid">Error</span>
      </div>
    </div>
    <div class="input-box-warpper">
      <span>密码</span>

      <div class="input-warpper">
        <input
          class="input"
          type="password"
          placeholder="请输入密码"
          v-model="password"
          v-on:keyup.enter="login"
        />
        <span class="message" v-show="!isPassWordValid">Error</span>
      </div>
    </div>
    <h2>密码恢复选项</h2>
    <span>*以下两项中任意完成一项即可</span>

    <div class="other-field-warpper">
      <div class="other-field">
        <div class="input-box-warpper">
          <span>osu! 用户名</span>

          <div class="input-warpper">
            <input
              class="input"
              spellcheck="false"
              placeholder="请输入 osu! 用户名"
              v-model="osuname"
              v-on:keyup.enter="login"
            />
            <span class="message" v-show="!isOsuNameValid">Error</span>
          </div>
        </div>
        <div class="input-box-warpper">
          <span>电子邮箱</span>

          <div class="input-warpper">
            <input
              class="input"
              placeholder="请输入电子邮箱"
              type="email"
              spellcheck="false"
              v-model="email"
              v-on:keyup.enter="login"
            />
            <span class="message" v-show="!isEmailValid">Error</span>
          </div>
        </div>
      </div>
    </div>
    <a class="radius-btn" v-on:click="register" v-bind:class="{'valid':isInputValid}">注册</a>
    <a class="text-btn return-btn" v-on:click="toView(0)">返回登录</a>
  </div>
</template>

<script>
export default {
  name: "register-view",
  data: function() {
    return {
      username: null,
      password: null,
      osuname: null,
      email: null
    };
  },
  computed: {
    isUserNameValid: function() {
      let reg = /^[A-Z0-9a-z\[\]\ ]{3,20}$/;
      if (this.username == null) return true;
      else if (reg.test(this.username)) return true;
      return false;
    },
    isPassWordValid: function() {
      let reg = /^.{8,20}$/;

      if (this.password == null) return true;
      else if (reg.test(this.password)) return true;
      return false;
    },
    isOsuNameValid: function() {
      let reg = /^[A-Z0-9a-z\[\]\ ]{3,20}$/;
      if (this.osuname == null) return true;
      else if (reg.test(this.osuname)) return true;
      return false;
    },
    isEmailValid: function() {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
      if (this.email == null) return true;
      else if (reg.test(this.email)) return true;
      return false;
    },
    isOtherFieldValid: function() {
      return (
        (this.osuname != null && this.isOsuNameValid) ||
        (this.email != null && this.isEmailValid)
      );
    },
    isInputValid: function() {
      if (this.username == null || this.password == null) return false;
      return (
        this.isPassWordValid && this.isUserNameValid && this.isOtherFieldValid
      );
    }
  },
  methods: {
    toView: function(i) {
      this.$emit("update:currentView", i);
    },
    register: function() {}
  }
};
</script>

<style lang="scss">
.other-field-warpper {
  margin: 30px 0;
  .other-field {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -15px;
      left: -15px;
      right: -15px;
      bottom: -15px;
      border: 2px #d9d9d9 dashed;
    }

    .input-box-warpper .input-warpper .message {
      margin-left: 40px;
    }
  }
}

.return-btn {
  margin: 15px 0;
}
</style>