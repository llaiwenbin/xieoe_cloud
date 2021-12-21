<template>
  <div class="account-wrapper">

    <div class="account-title">
      <!--去掉验证码登录 去掉微信登录-->
     <p
        :class="['account-title-item', {'account-title-active': isActive}]"
        @click="toggleContent('account')"
      >
        密码登录
        <span class="account-title-line"></span>
      </p>

      <p
        :class="['account-title-item', {'account-title-active': !isActive}]"
        @click="toggleContent('verify')"
      >
        验证码登录
        <span class="account-title-line"></span>
      </p>
    </div>
    <!--<div class="picture-tag">
      <p class="picture-tag-name">微信登录</p>
      <img src="http://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/cmVzb3VyY2UtY291cnNlQXJ0aWNsZS01NTM2NDI0NQ.png" class="picture-icon" @click="switchWxLogin">
    </div>-->
   <div v-if="isActive">
      <account-login></account-login>
    </div>
    <div v-else>
      <verify-login></verify-login>
    </div>
  </div>
</template>

<script>
import accountLogin from "./accountLogin.vue";
import verifyLogin from "./verifyLogin.vue";
export default {
    components: {
        accountLogin,verifyLogin
    },
    data() {
        return {
            isActive: false,
        };
    },
    created() {
    },
    methods: {
    /**
     * switchWxLogin 切换为微信登录
     */
        switchWxLogin() {
            this.$router.push("/wx");
        },
        /**
     * toggleContent 切换内容
     * content Str 切换的内容名称
     */
        toggleContent(content) {
            this.isActive = content === "account" ? true : false;
        },
    },
};
</script>

<style lang="scss" scoped>
.account-wrapper {
  .account-title {
    display: flex;
    justify-content: center;
    align-items: center;
    /*padding-top: 64px;*/
    p {
      margin-top: 16px;
      margin-bottom: 10px;
      font-size:24px;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:33px;
    }
    .account-title-item {
      position: relative;
      margin: 0 29px;
      font-size: 18px;
      color: #999;
      font-weight: 500;
      cursor: pointer;
    }
    .account-title-active {
      color: #333;
      .account-title-line {
        width: 40px;
        background-color: #105CFB;
      }
    }
    .account-title-line {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      display: inline-block;
      width: 0;
      height: 2px;
      transition: all 0.2s linear;
    }
  }
}
</style>
