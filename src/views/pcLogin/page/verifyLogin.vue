<template>
    <div class="account-login-wrapper">
        <div class="account-input-list">
            <div class="account-input-item">
                <ss-phone-input
                    ref="ssInput"
                    v-model="phoneNumber"
                    theme="border"
                    width="100%"
                    @focus="handleReport"
                    @blur="handleBlur"
                ></ss-phone-input>
            </div>
            <div class="account-input-item">
                <invalid-phone
                    :invalidPhoneObj="invalidPhoneObj"
                    @handleInvalidBlur="handleInvalidBlur"
                    @handleInvalidErr="handleInvalidErr"
                    @init="handleInit"
                ></invalid-phone>
            </div>
        </div>
        <div class="account-operate">
            <a href="javascript: void(0)" @click="$router.push('/forget')"
                >忘记密码</a
            >
        </div>
        <div @click="login" class="login-btn big-button">登录</div>
        <p class="verify-des">
            还没账号？
            <a href="javascript:void(0)" @click="register">立即注册</a>
        </p>
    </div>
</template>

<script>
import phone from "../components/input/phone.vue";
import invalidPhone from "../components/input/invalidPhone.vue";
import { codeLogin } from "@/api";
import { slicePhone, checkOverseasPhone } from "@/utils";
import { ACCOUNT_ERR_MESSAGE, } from '@/constants'

export default {
    components: {
        phone,
        invalidPhone,
    },
    data() {
        return {
            autoLogin: false, // 三天内自动登录
            phoneNumber: "",
            isQlive: false,
            phoneObj: {
                name: "手机号",
                isError: false,
                errorTip: "请输入正确的手机号",
                maxLength: 11,
                account: "",
                isFocus: false,
                isRules: true,
                pointName: "PC_new_登陆页_验证码登录",
            },
            invalidPhoneObj: {
                name: "验证码",
                isError: false,
                errorTip: "请输入正确的验证码",
                maxLength: 6,
                veriCode: "",
                isFocus: false,
                phone: "",
                poinDataName: "PC_new_登陆页_验证码登录",
                pageName: "验证码登录",
            },
            session_id:""
        };
    },
    watch: {
        phoneNumber(val) {
            this.$set(this.invalidPhoneObj, "phone", val);
        },
    },
    created() {
        let that = this;
        document.onkeydown = function (e) {
            if (e.which == 13) {
                that.login();
            }
        };

        if (localStorage.getItem("xe_auto_login") == "true") {
            // this.autoLogin = true;
        }

        if (this.$route.query.from) {
            let from = this.$route.query.from;
            //判断是否为企业直播店铺
            if (from == "qyzb") {
                this.isQlive = true;
            }
        }
    },
    methods: {
        /**
         * login 登录
         */
        async login() {
            if (!checkOverseasPhone(this.phoneNumber)) return;
            if (this.invalidPhoneObj.veriCode.length != 6) {
                this.invalidPhoneObj.isError = true;
                return false;
            }
            localStorage.setItem("xe_auto_login", this.autoLogin);
            // var params = {
            //   username: this.phoneNumber,
            //   sms_code: this.invalidPhoneObj.veriCode,
            //   login_type: 2,
            //   keep_login: this.autoLogin
            // };
            if( !this.session_id ){
                  return  this.$message.warning('请先获取验证码')
             }
            const [err, res] = await codeLogin({
                ...slicePhone(this.phoneNumber),
                code: this.invalidPhoneObj.veriCode,
                session_id:this.session_id
            });
            if (!err) {
                const { data, code, msg } = res;
                let enter = window.sessionStorage.getItem(
                    "XIAOE_ACTIVITY_ENTER"
                );
                window.sessionStorage.removeItem("XIAOE_ACTIVITY_ENTER");

                localStorage.setItem("xe_username", this.phoneObj.account);
                localStorage.setItem("token", data.token);
                localStorage.setItem("b_user_id", data.b_user_id);
                localStorage.setItem(
                    "user_account_avatar",
                    data.user_account_avatar
                );
                this.$router.push("/");
            } else {
                if(ACCOUNT_ERR_MESSAGE[err.code]){
                    this.phoneObj.errorTip = ACCOUNT_ERR_MESSAGE[err.code];
                    this.$refs.ssInput.handleError(ACCOUNT_ERR_MESSAGE[err.code]);
                    this.phoneObj.isError = true;
                }else {
                    this.$message.warning(err.msg || '服务器异常，请稍候重试')
                }
            }
        },
        /**
         * register 注册
         */
        register() {
            this.$router.push("/register");
        },
        /**
         * handlePwdBlur 处理密码失去焦点事件
         */
        handlePwdBlur(info) {
            if (!info.pwd) {
                info.isError = true;
                info.errorTip = "请输入正确的密码";
                info.isFocus = false;
            }
            this.pwdObj = info;
        },
        /**
         * handleInvalidBlur 处理短信验证码失去焦点事件
         */
        handleInvalidBlur(info) {
            if (info.veriCode.length && info.veriCode.length < 6) {
                info.isError = true;
                info.isFocus = true;
            } else if (!info.veriCode) {
                info.isFocus = false;
                info.isError = true;
            }
            info.errorTip = '请输入正确的验证码'
            this.invalidPhoneObj = info;
        },
        /**
         * handleInvalidErr 处理短信验证报错事件
         */
        handleInvalidErr(err) {
            const { msg, code } = err;
            if (code === 10006) {
                this.invalidPhoneObj.errorTip = "短信发送太频繁，请稍后再试";
                this.invalidPhoneObj.isError = true;
            } else if (msg) {
                this.$refs.ssInput.handleError(msg);
            } else {
                this.$message.warning("服务器异常，请稍候重试");
            }
        },
        handleReport() {},
        handleBlur() {
            this.invalidPhoneObj.phone = this.phoneNumber;
            const { ssInput } = this.$refs;
            !checkOverseasPhone(ssInput.phoneNumber)
                ? ssInput.handleError("请输入正确的帐号")
                : ssInput.handleError("");
        },
        handleInit({session_id}){
            this.session_id = session_id
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/login.scss";
</style>
