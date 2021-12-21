<template>

  <div class="loginContainer" >
    <img src="@/assets/images/login-logo.png"
         class="logo"
         alt="小鹅云"
         @click="goToXiaoeCloud"
         title="小鹅云"
    >
    <div class="login-wrapper">
      <div class="login-container" :style="loginContainerHeight">
        <router-view></router-view>
      </div>
    </div>
    <div class="xiaoeDesc">
      <p class="xiaoe-des">
        <span class="xiaoe-line-left"></span>
        小鹅通
        <span class="dot"></span>知识产品与用户服务的数字化工具
        <span class="xiaoe-line-right"></span>
      </p>
      <p
              class="xiaoe-records"
      >Copyright © 2015-2021 深圳小鹅网络技术有限公司 All Rights Reserved. 粤ICP备15020529号 </p>
    </div>
  </div>
</template>
<script>

export default {
    data() {
        return {
            loginContainerHeight: '',  // 登录面板高度
            isShow: true,           // 显示运营位
            loginBannerInfo: {}, // 登录运营位信息
            registerBannerInfo: {}, // 注册运营位信息
            isLoginModel: true, // 是否展示登录模块运营位banner
            bannerImg: "", // 运营位banner图
            jumpUrl: "", // 运营位banner图点击跳转
            bannerTitle: "", // 运营位埋点名
        };
    },
    created() {
        console.log('newPcLogin');
        // 如果是快捷登录, 那么调节高度
        if (this.$route.fullPath === "/quickLogin") {
            this.loginContainerHeight = 'min-height: 350px; height: 350px';
        } else if(this.$route.fullPath === '/register'){
            this.loginContainerHeight = '';
            this.$router.push('/register');
        }else{
            this.loginContainerHeight = '';
            this.$router.push('/account');
        }
    },
    methods: {
        goToXiaoeCloud() {
            window.open('https://cloud.xiaoe-tech.com');
            // location.href = "https://www.xiaoe-tech.com/";
        },
    },
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  width: 1000px;
  height: 440px;
  display: flex;
  justify-content: center;
  .login-bg {
    position: relative;
    width: 480px;
    height: 100%;
    .login-img {
      width: 100%;
      height: 100%;
    }
  }
  .login-bg-hover:hover {
    cursor: pointer;
  }
  .login-container {
    width: 500px;
    height: 100%;
    padding: 40px 70px;
    background: rgba(255, 255, 255, 1);
    position: relative;
  }
}

// 公共标签样式
 :deep.picture-tag {
  position: absolute;
  right: 33px;
  top: 33px;
  display: flex;
  justify-content: flex-start;
  .picture-tag-name {
    position: relative;
    margin: 0;
    margin-right: 8px;
    box-sizing: content-box;
    width: 87px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
    background: rgba(217, 229, 255, 1);
    border: 1px solid rgba(186, 208, 255, 1);
    color: #3778ff;
    &::before {
      border: 6px solid transparent;
      border-left-color: #bad0ff;
      z-index: 1;
      content: " ";
      display: block;
      position: absolute;
      left: 100%;
      top: 50%;
      margin-top: -6px;
    }
    &::after {
      content: " ";
      display: block;
      position: absolute;
      left: 100%;
      top: 50%;
      margin-top: -6px;
      border: 6px solid transparent;
      border-left-color: #d6e4f7;
      transform: translateX(0.5px);
      margin-left: -2px;
      z-index: 1;
    }
  }
  .picture-icon {
    position: relative;
    top: -4px;
    width: 42px;
    height: 42px;
    cursor: pointer;
  }
}


/* app.vue 复制来的*/
*,
:deep * {
  box-sizing: border-box;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
a, :deep a {
  text-decoration: none;
  color: #2a75ed;
}
:deep html,
:deep body {
  background-color: #f5f6f9;
  margin: 0;
}

:deep [type="checkbox"]:checked + label {
  color: #666666;
}
:deep [type="checkbox"].filled-in {
  display: none;
}
:deep [type="checkbox"] + label {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  display: inline-block;
  height: 12px;
  line-height: 12px;
  font-size: 12px;
  color: #999;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}

:deep [type="checkbox"].filled-in + label:after,
:deep [type="checkbox"].filled-in + label:before {
  content: "";
  left: 0;
  position: absolute;
  transition: border 0.25s, background-color 0.25s, width 0.2s 0.1s,
  height 0.2s 0.1s, top 0.2s 0.1s, left 0.2s 0.1s;
  z-index: 1;
}

:deep [type="checkbox"].filled-in:not(:checked) + label:before {
  width: 0;
  height: 0;
  border: 3px solid transparent;
  left: 6px;
  top: 3px;
  -webkit-transform: rotateZ(37deg);
  -ms-transform: rotate(37deg);
  transform: rotateZ(37deg);
  -webkit-transform-origin: 20% 40%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

:deep [type="checkbox"].filled-in:not(:checked) + label:after {
  height: 12px;
  width: 12px;
  background-color: transparent;
  border: 1px solid #d4d9e2;
  top: 0px;
  z-index: 0;
}

:deep [type="checkbox"].no-agree:not(:checked) + label:after {
  height: 12px;
  width: 12px;
  background-color: transparent;
  border: 1px solid #ff3366;
  top: 0px;
  z-index: 0;
}

:deep [type="checkbox"].filled-in:checked + label:before {
  top: -4px;
  left: 1px;
  width: 5px;
  height: 11px;
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  -webkit-transform: rotateZ(45deg);
  -ms-transform: rotate(45deg);
  transform: rotateZ(45deg);
  -webkit-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  transform-origin: 100% 100%;
}

:deep [type="checkbox"].filled-in:checked + label:after {
  top: 0px;
  width: 12px;
  height: 12px;
  border: 1px solid #d4d9e2;
  z-index: 0;
}
.loginContainer {
  position: absolute;
  min-height: 730px;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep .logo {
  position: absolute;
  top: 3%;
  left: 2%;
  width: 167px;
  cursor: pointer;
}

:deep .xiaoeDesc {
  line-height: 20px;
  text-align: center;
  position: absolute;
  bottom: 3.6%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0;
  min-width: 600px;
  .xiaoe-des {
    position: relative;
    margin: 0;
    font-size: 14px;
    letter-spacing: -0.2px;
    color: #666666;
    .xiaoe-line-left {
      position: relative;
      display: inline-block;
      border-bottom: 2px solid #888;
      width: 30px;
      top: -3px;
    }
    .xiaoe-line-right {
      position: relative;
      display: inline-block;
      border-bottom: 2px solid #888;
      width: 30px;
      top: -3px;
    }
    .dot {
      display: inline-block;
      width: 3px;
      height: 3px;
      margin: 3px 5px;
      border-radius: 50%;
      background-color: #888888;
    }
  }
  .xiaoe-records {
    margin: 15px 0 0;
    font-size: 12px;
    color: #999;
  }
}

/** 以下为公共样式 **/
:deep .inputText {
  color: #666666;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  font-size: 14px;
  margin: 0;
  line-height: 35px;
  transform: translate3d(0, 28px, 0) scale(1);
  transform-origin: left top;
  position: absolute;
  bottom: 30px;
}

:deep .inputTextFocus {
  font-size: 12px;
  transform: translateZ(0) scale(1);
}

:deep .inputBox {
  position: relative;
  width: 100%;
  height: 36px;
  &:focus {
    border: 1px solid #000;
  }
  &.hasIcon {
    background-size: 12px auto;
    background-position: left 10px center;
    background-repeat: no-repeat;
  }
  input {
    font-size: 16px;
    border: none;
    outline: none;
    box-shadow: none;
    width: 100%;
    line-height: 34px;
    height: 36px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    border-bottom: solid 1px #d4d9e2;
    background: transparent;
    transition: all 0.2s linear;
    &:focus {
      border-bottom: solid 1px #2a75ed;
    }
  }

  /* 输入框警告,紧随输入框后的inputAlert类隐藏，在输入框增加类alert会使警告内容显示 */
  &.alert {
    input {
      border-color: #ff3366;
    }
    .inputAlert {
      display: block;
      color: #ff3366;
      font-size: 12px;
      margin: 0;
      line-height: 12px;
      position: absolute;
      right: 0;
      bottom: -18px;
      &.hasTitle {
        margin-left: 66px;
      }
    }
  }
  .inputAlert {
    display: none;
  }
}
</style>

