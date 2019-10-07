<template>
  <div class="login-view">
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
        <span class="message" v-show="showUserNameError">Error</span>
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
        <span class="message" v-show="showPasswordError">Error</span>
      </div>
    </div>
    <a class="radius-btn login-btn" v-bind:class="{'valid':isEmpty}" v-on:click="login">登陆</a>
    <a class="register-btn text-btn" v-on:click="toView(1)">注册</a>
    <a class="forget-btn text-btn" v-on:click="toView(2)">忘记密码？</a>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login-view",
  data: function() {
    return {
      username: null,
      password: null,
      showUserNameError: false,
      showPasswordError: false
    };
  },
  computed: {
    isUserNameValid: function() {
      let reg = /^[A-Z0-9a-z\[\]\ \_]{3,20}$/;
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
    isInputValid: function() {
      if (this.username == null || this.password == null) return false;
      if (!this.isUserNameValid) {
        this.showUserNameError = true;
        return false;
      } else {
        this.showUserNameError = false;
      }
      if (!this.isPassWordValid) {
        this.showPasswordError = true;
        return false;
      } else {
        this.showPasswordError = false;
      }

      return true;
    },
    isEmpty: function() {
      if (this.username && this.password) return true;
      return false;
    }
  },
  methods: {
    toView: function(i) {
      this.$emit("update:currentView", i);
    },
    login: function() {
      if (!this.isInputValid) return;
      let combineString = "";
      let passWd = this.password;
      let userName = this.username.replace(" ", "_");
      let md5Key, sha1Key;
      for (let i = 0; i != 100; i++) {
        combineString += userName;
        combineString += passWd;
      }
      var md5 = require("js-md5");
      var sha1 = require("js-sha1");
      md5Key = md5(combineString);
      sha1Key = sha1(combineString);
      axios
        .post("/api/login", {
          user_name: this.username,
          pwd_md5: md5Key,
          pwd_sha1: sha1Key
        })
        .then(function(response) {
          console.log(response);
        });
      console.log(combineString);
      console.log(md5Key);
      console.log(sha1Key);
    }
  }
};
</script>


<style lang="scss">
.login-view {
  margin-top: 25px;
}

.input-box-warpper {
  position: relative;
  .input-warpper {
    margin: 15px 0;
    display: block;
    background: #f5f5f5;
    padding: 10px 15px;
    overflow: hidden;
    border-radius: 5px;

    .input {
      outline: 0;
      border: 0;
      background: transparent;
      width: 100%;
      font-size: 1.2rem;
    }
    .message {
      display: inline-block;
      margin-left: 20px;
      position: absolute;
    }
  }
}

.radius-btn {
  display: block;
  background: #f5f5f5;
  color: #d3d3d3;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  vertical-align: middle;
  height: 50px;
  box-sizing: border-box;
  transition: background-color 0.3s linear;
  cursor: pointer;
  user-select: none;
  cursor: not-allowed;

  &:hover {
    color: #d3d3d3;
  }
  &.valid {
    background: #f759ab;
    color: #ffffff;
    cursor: pointer;
  }
}
.text-btn {
  display: block;
  cursor: pointer;
  text-align: center;
}

.login-btn {
  width: 75%;
  margin: 50px auto 25px auto;
}

.register-btn {
  float: left;
}

.forget-btn {
  float: right;
}
</style>