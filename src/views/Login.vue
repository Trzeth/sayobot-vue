<template>
  <div id="main">
    <div class="login-warpper">
      <div class="title">
        <router-link to="/">
          <h1>Sayobot</h1>
          <div class="text">
            <span class="sayo">Sayo</span>
            <span>bot</span>
          </div>
        </router-link>

        <div class="splitter"></div>
        <h2 class="sub-title">{{currentViewName}}</h2>
      </div>
    </div>
    <component v-bind:is="currentViewComponent" v-bind:currentView.sync="currentView"></component>
  </div>
</template>

<script>
import LoginView from "./loginViews/LoginView";
import RegisterView from "./loginViews/RegisterView";
import ResetPasswordView from "./loginViews/ResetPasswordView";

export default {
  name: "login",
  components: {
    LoginView,
    RegisterView,
    ResetPasswordView
  },
  data: function() {
    return {
      views: ["login-view", "register-view", "reset-password-view"],
      viewNames: ["登录", "注册", "找回密码"],
      currentView: 0
    };
  },
  computed: {
    currentViewComponent: function() {
      return this.views[this.currentView];
    },
    currentViewName: function() {
      return this.viewNames[this.currentView];
    }
  }
};
</script>

<style lang="scss" scoped>
#main {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    display: flex;
    align-items: center;
    height: 72px;
    h1 {
      display: none;
    }
    .text {
      margin: auto 10px auto 0;
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 2px;
      vertical-align: middle;
      position: relative;
      cursor: pointer;

      &:hover .sayo {
        background: #f759ab;
        color: #ffffff;
      }
      .sayo {
        font-size: 36px;

        box-sizing: border-box;
        display: inline-block;
        padding: 5px 5px;
        margin: 0 5px;
        border-radius: 10px;
        color: #f759ab;
        letter-spacing: 2px;
        transition: color 0.2s linear, background 0.2s linear;
      }
    }
    .sub-title {
      margin: auto 0 auto 5px;
      font-size: 1.5rem;
    }
    .splitter {
      margin: auto 0;
      display: block;
      margin-right: 10px;
      height: 50%;
      border-left: 2px solid #595959;
    }
  }
}
</style>