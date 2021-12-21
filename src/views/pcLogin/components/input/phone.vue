<template>
  <div class="phoneWrapper">
    <input type="text" hidden>
    <p :class="['inputText', {'inputTextFocus': phoneInfo.isFocus}]">{{phoneInfo.name}}</p>
    <div class="inputBox" :class="[{alert: phoneInfo.isError}]">
      <input
        :maxlength="phoneInfo.maxLength"
        @blur="checkPhone"
        @focus="handleFocus"
        @keyup="handleKeyUp"
        v-model="phoneInfo.account"
        type="text"
        autocomplete='off'
      >
      <p class="inputAlert hasTitle" v-html="phoneInfo.errorTip"></p>
    </div>
  </div>
</template>

<script>

export default {
    props: {
        phoneObj: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            phoneInfo: this.phoneObj,
        };
    },
    methods: {
        checkPhone() {
            this.$emit("handlePhoneBlur", this.phoneInfo);
        },
        handleKeyUp() {
            if (this.phoneInfo.isRules) {
                this.phoneInfo.account = this.phoneInfo.account.replace(/[^\d]/g,'');
            }
        },
        /**
     * handleFocus 处理获取焦点事件
     */
        handleFocus() {
            this.phoneInfo.isError = false; 
            this.phoneInfo.isFocus = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.phoneWrapper {
  color: #353535;
  position: relative;
  a {
    text-decoration: none;
    color: #2a75ed !important;
    font-size: 12px !important;
  }
}
</style>
