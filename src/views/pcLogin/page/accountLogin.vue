<template>
    <div class="account-login-wrapper">
        <div class="account-input-list">
            <div class="account-input-item">
                <ss-phone-input
                    width="360px"
                    theme="border"
                    v-model="phoneObj.account"
                    @focus="handleFocus"
                    @blur="handlePhoneBlur"
                    ref="ssPhoneInput"
                ></ss-phone-input>
            </div>
            <div class="account-input-item">
                <password
                    :pwdObj="pwdObj"
                    @handlePwdBlur="handlePwdBlur"
                ></password>
            </div>
        </div>
        <p class="account-operate">
            <!-- <input
                class="filled-in"
                id="remindPw"
                v-model="remindPw"
                type="checkbox"
            /> -->
            <el-checkbox v-model="remindPw">记住密码</el-checkbox>
            <!-- <label for="remindPw" class="remind-pwd">记住密码</label> -->
            <a href="javascript: void(0)" @click="forgotPwd">忘记密码</a>
        </p>
        <div
            @click="send"
            :class="['login-btn', { 'login-btn-disable': showImgVerify }]"
        >
            登录
        </div>
        <div class="verify-code-wrapper" v-show="showImgVerify">
            <img
                src="http://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/cmVzb3VyY2UtY291cnNlQXJ0aWNsZS0yNDUwMzQ4NA.png"
                class="verify-code-close-img"
                @click="showImgVerify = false"
            />
            <p class="verify-code-text">请输入验证码</p>
            <div class="verify-code-input-box">
                <input
                    type="text"
                    class="verify-code-input"
                    v-model="imgCode"
                    @focus="veriFlag = false"
                    @keyup.enter="verificationCode"
                />
                <img class="verify-code-img" ref="imgElement" />
                <div class="verify-code-btn" @click="verificationCode">
                    确定
                </div>
            </div>
            <p class="verify-code-error" v-if="veriFlag">请输入正确的验证码</p>
        </div>
        <p class="verify-des">
            还没账号？
            <a href="javascript:void(0)" @click="$router.push('/register')"
                >立即注册</a
            >
        </p>
        <!-- <verify-code
            ref="VerifyCode"
            :imgElement="imgElement"
            :imgCode="imgCode"
            @load="handleLoad"
            @downGrade="handleDownGrade"
            @success="handleSuccess"
            @fail="handleFail"
            @getImgFail="handleFail"
            @slideClosed="handleSlideClosed"
            :verifyTypeRequest="verifyTypeRequest"
        ></verify-code> -->
    </div>
</template>

<script>
import phone from "../components/input/phone.vue";
import password from "../components/input/password.vue";
import { pwdLogin, fetchVerification } from "@/api";
import { slicePhone, checkOverseasPhone, urlParse } from "@/utils";
import { ACCOUNT_ERR_MESSAGE, PWD_ERR_MESSAGE } from "@/constants";
// import { VerifyCode } from "@xiaoe/sense";

export default {
    components: {
        phone,
        password,
        // VerifyCode,
    },
    data() {
        return {
            remindPw: false,
            isShowCaptcha: false, // 是否展示滑块验证
            showImgVerify: false, // 是否展示图形验证
            veriCodeSrc: "", // 图形验证码图片
            veriFlag: false, // 是否显示图形验证码错误提示
            isLoginEnd: true, // 防止多次点击登录
            poinDataName: "PC_new_登陆页_密码登录",
            phoneObj: {
                name: "手机号",
                isError: false,
                errorTip: "请输入正确的手机号",
                maxLength: 11,
                account: "",
                isFocus: false,
                isRules: true,
                pointName: "PC_new_登陆页_密码登录",
            },
            pwdObj: {
                name: "密码",
                isError: false,
                errorTip: "请输入至少6位数密码",
                maxLength: "",
                pwd: "",
                isFocus: false,
            },
            imgElement: null,
            imgCode: "",
            type: 0,
            useVerifyImg: false, //是否显示图形验证码
            verifyParams: null,
        };
    },
    created() {
        let that = this;
        document.onkeydown = function (e) {
            if (e.which == 13) {
                that.login();
            }
        };
    },
    mounted() {
        console.log(this);
        this.initAccount();
        this.imgElement = this.$refs.imgElement;
        this.$refs.VerifyCode.initCaptcha();
    },
    computed: {
        typeName({ type }) {
            return {
                0: "noVerify",
                1: "slide",
                2: "image",
            }[type];
        },
    },
    methods: {
        verifyTypeRequest() {
            return new Promise(async (resolve, reject) => {
                const [err, res] = await fetchVerification({
                    scene_type: "password_login",
                });
                if (!err) {
                    const {
                        CaptchaAppId: appid,
                        types: type,
                        session_id: sessionId,
                    } = res.data;
                    resolve({ appid, type, sessionId });
                } else {
                    reject();
                }
            });
        },
        send() {
            if (
                !this.pwdObj.pwd ||
                !this.phoneObj.account ||
                !checkOverseasPhone(this.phoneObj.account)
            ) {
                return;
            }
            if (this.useVerifyImg) {
                this.showImgVerify = true;
                this.imgCode = "";
            } else {
                this.$refs.VerifyCode.handleVerify();
            }
        },
        turn(data) {
            return JSON.stringify(data);
        },
        handleLoad(type, captcha) {
            this.type = type; // 只有加载成功和加载失败后才需要修改type。type为image的时候需要显示图片
            if (this.typeName == "image") {
                this.useVerifyImg = true;
            }
            console.log(
                `验证码加载成功，类型是${this.typeName},只有滑块有captcha`,
                captcha
            );
        },
        handleSuccess(data) {
            console.log("验证码通过", data);
            // 验证码组件不作 imgCode 的验证
            if (this.typeName == "image" && !this.imgCode) {
                this.$message.warning(errMsg);
                return;
            }
            this.verifyParams = data;
            this.login();
        },
        handleDownGrade(errMsg, data) {
            console.log(
                `验证码从滑块降级成图形,错误类型为：${errMsg}，报错信息为：`,
                data
            );
        },
        handleSlideClosed(data) {
            console.log("滑块验证码主动关闭，滑块验证码返回的信息：", data);
        },
        handleFail(type, errMsg, data) {
            // 失败后需要修改类型，并显示图片验证码
            this.$message.warning(errMsg);
            this.type = type;
            this.useVerifyImg = true;
            console.error(
                `验证码加载失败，错误文案为：${errMsg}，报错信息为：`,
                data
            );
        },
        /**
         * initAccount 初始化密码登录
         */
        initAccount() {
            let params = urlParse();
            if (params.type === "test") {
                this.phoneObj.account = "test";
                this.pwdObj.pwd = "123456";
            }
            if (this.$cookie.get("xe_username")) {
                let xe_username = this.$cookie.get("xe_username");
                this.$refs.ssPhoneInput.setPhone(xe_username.split("-")[1]);
                this.phoneObj.account = this.$cookie.get("xe_username");
                this.pwdObj.pwd = this.$cookie.get("xe_passwd");
                this.remindPw = true;
            }

            if (this.phoneObj.account) {
                this.phoneObj.isFocus = true;
            }
            if (this.pwdObj.pwd) {
                this.pwdObj.isFocus = true;
            }
        },
        /**
         * login 登录
         */
        login() {
            console.log([this.isShowCaptcha, !this.isLoginEnd]);
            if (this.isShowCaptcha || !this.isLoginEnd) {
                return false;
            }
            if (
                !checkOverseasPhone(this.phoneObj.account) ||
                this.phoneObj.account == null
            ) {
                this.phoneObj.isError = true;
                this.phoneObj.errorTip = "请输入正确的帐号";
                return false;
            } else if (this.pwdObj.pwd == "" || this.pwdObj.pwd == null) {
                this.pwdObj.isError = true;
                this.pwdObj.errorTip = "请输入正确的密码";
                return false;
            }
            this.loginSendReq();
        },
        /**
         * 发送登录请求
         */
        async loginSendReq() {
            this.isLoginEnd = false;
            if (this.remindPw) {
                this.$cookie.set("xe_username", this.phoneObj.account, 7);
                this.$cookie.set("xe_passwd", this.pwdObj.pwd, 7);
            } else {
                this.$cookie.delete("xe_username");
                this.$cookie.delete("xe_passwd");
            }
            const { nation_code, phone } = slicePhone(this.phoneObj.account);
            if (!this.verifyParams) {
                return this.$message.warning("验证系统异常");
            }
            const [err, res] = await pwdLogin({
                nation_code,
                phone,
                password: this.pwdObj.pwd,
                ...this.verifyParams,
            });
            this.isLoginEnd = true;
            if (!err) {
                let data = res.data;
                localStorage.setItem("xe_username", this.phoneObj.account);
                localStorage.setItem("token", data.token);
                localStorage.setItem("b_user_id", data.b_user_id);
                localStorage.setItem(
                    "user_account_avatar",
                    data.user_account_avatar
                );
                this.$router.push("/");
            } else {
                this.showImgVerify = false;
                this.imgCode = "";
                if (this.useVerifyImg) {
                    this.$refs.VerifyCode.getImgCode();
                }
                if (ACCOUNT_ERR_MESSAGE[err.code]) {
                    this.phoneObj.errorTip = ACCOUNT_ERR_MESSAGE[err.code];
                    this.$refs.ssPhoneInput.handleError(
                        ACCOUNT_ERR_MESSAGE[err.code]
                    );
                    this.phoneObj.isError = true;
                } else if (PWD_ERR_MESSAGE[err.code]) {
                    this.pwdObj.errorTip = PWD_ERR_MESSAGE[err.code];
                    this.pwdObj.isError = true;
                } else {
                    this.$message.warning(err.msg || "服务器异常，请稍候重试");
                }
            }
        },
        /**
         * handlePhoneBlur 处理手机号失去焦点事件
         */
        handlePhoneBlur() {
            const { ssPhoneInput } = this.$refs;
            !checkOverseasPhone(ssPhoneInput.phoneNumber)
                ? ssPhoneInput.handleError("请输入正确的帐号")
                : ssPhoneInput.handleError("");
        },
        handleFocus() {
            this.$refs.ssPhoneInput.handleError("");
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
         * verificationCode 验证图形验证码
         */
        verificationCode() {
            this.$refs.VerifyCode.handleVerify();
        },
        forgotPwd() {
            this.$router.push("/forget");
        },
        forgotPwd() {
            this.$router.push("/forget");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/login.scss";
</style>
