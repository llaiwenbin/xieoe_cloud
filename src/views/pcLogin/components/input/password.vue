<template>
  <div class="passwordWrapper">
    <input type="password" hidden autocomplete='new-password'>
    <p :class="['inputText', {'inputTextFocus': pwdInfo.isFocus}]">{{pwdInfo.name}}</p>
    <div class="inputBox" :class="[{alert: pwdInfo.isError}]">
      <input
        :type="eyesOpen ? 'text' : 'password'"
        :maxlength="pwdInfo.maxLength"
        @blur="handleBlur"
        @focus="handleFocus"
        v-model="pwdInfo.pwd"
        autocomplete='new-password'
      >
      <i
        :class="['iconfont eyes ', 'font_family', eyesOpen ? 'icon-yanjing-zheng' : 'icon-yanjing_bi']"
        @click="eyesOpen = !eyesOpen"
      ></i>
      <p class="inputAlert hasTitle" v-html="pwdInfo.errorTip"></p>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        pwdObj: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            pwdInfo: this.pwdObj,
            eyesOpen: false,
        };
    },
    methods: {
    /**
     * handleBlur 处理失去焦点事件
     */
        handleBlur() {
            this.$emit("handlePwdBlur", this.pwdInfo);
        },
        /**
     * handleFocus 处理获取焦点事件
     */
        handleFocus() {
            this.pwdInfo.isError=false;
            this.pwdInfo.isFocus = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.passwordWrapper {
  color: #353535;
  position: relative;
  .eyes {
    position: absolute;
    bottom: 5px;
    right: 0;
    color: #d4d9e2;
    cursor: pointer;
    font-size: 24px;
  }
  .inputBox {
    input {
      padding-right: 30px;
    }
  }
}
</style>
