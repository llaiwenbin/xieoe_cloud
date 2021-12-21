<template>
  <div class="quick-login-wrapper">
    <div class="ql-title">快捷登录</div>
    <div class="ql-input-wrapper">
      <span>您已登录以下小鹅通帐号</span>
      <div class="inputBox">
        <input disabled :value="userName"/>
      </div>
    </div>
    <div @click="quickLogin" :class="['login-btn', {'login-btn-disable': disableLogin}]">快速登录云服务</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            disableLogin: false,   // 禁止登录按钮,
            userName: localStorage.getItem('phoneFromB'),
        };
    },
    created() {
    },
    watch: {

    },
    methods: {
        quickLogin() {
            if (this.disableLogin) {return;}
            this.disableLogin = true;
            this.$http.get(`/xiaoe_cloud/api/quick_login/${localStorage.getItem('code')}`, {code:localStorage.getItem('code')}).then(res => {
                if (res.code === 0) {
                    localStorage.setItem('xe_username',  localStorage.getItem('phoneFromB'));
                    this.$cookie.set("xe_username", localStorage.getItem('xe_username'), 7);
                    localStorage.setItem('b_user_id', res.data.b_user_id);
                    localStorage.removeItem('phoneFromB');
                    localStorage.setItem('token', res.data.token);
                    location.href = location.origin;
                }
            }).catch(() => {
                localStorage.removeItem('token');
                this.$message({
                    duration: '1000',
                    center: true,
                    message: '快捷登录失败, 请输入账号密码登录',
                    type: 'warning',
                });
                setTimeout(()=>location.href = location.origin+'#/login', 1000);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
  .quick-login-wrapper{
    display: flex;
    padding-top: 15px;
    padding-bottom: 16px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .ql-title{
      width:96px;
      height:33px;
      font-size:24px;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:33px;
    }

    .ql-input-wrapper{
      width: 100%;
      span{
        display: inline-block;
        margin-bottom: 3px;
      }
      input{
        font-weight: 500;
      }
    }

    .login-btn {
      text-align: center;
      width: 360px;
      height: 60px;
      background: rgba(16, 92, 251, 1);
      border-radius: 4px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 60px;
      margin-top: 0;
      cursor: pointer;
      color: #fff;
      outline: none;
      transition: all 100ms ease;
      &:hover {
        background-color: #136ffe;
      }

    }
      .login-btn-disable {
          color: #bbb;
          background: #f8f8f8;
          border: 1px solid #e5e5e5;
          cursor: not-allowed;
          &:hover {
              background-color: #f8f8f8;
          }
      }
  }
</style>
