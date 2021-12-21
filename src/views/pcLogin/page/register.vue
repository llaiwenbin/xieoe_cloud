<template>
    <div class="register-wrapper">
        <div class="register-title">账户注册</div>
        <div class="register-input-list">
            <div class="register-input-item">
                <ss-phone-input
                    ref="ssInput"
                    v-model="phoneNumber"
                    theme="border"
                    width="100%"
                    @focus="handleReport"
                    @blur="handleBlur"
                ></ss-phone-input>
            </div>
            <div class="register-input-item">
                <invalid-phone
                    :invalidPhoneObj="invalidPhoneObj"
                    @handleInvalidBlur="handleInvalidBlur"
                    @handleInvalidErr="handleInvalidErr"
                    @init="onValidInit"
                ></invalid-phone>
            </div>
            <div class="register-input-item">
                <password
                    :pwdObj="pwdObj"
                    @handlePwdBlur="handlePwdBlur"
                ></password>
            </div>
        </div>
        <p class="register-operate">
            <input
                :class="['filled-in', { 'no-agree': isAgree }]"
                id="remindPw"
                v-model="agreeAgreement"
                type="checkbox"
                :data-sensors="
                    !agreeAgreement
                        ? '注册_注册页-知识店铺_勾选小鹅通协议'
                        : '注册_注册页-知识店铺_取消勾选小鹅通协议'
                "
            />
            <label
                for="remindPw"
                :data-sensors="
                    !agreeAgreement
                        ? '注册_注册页-知识店铺_勾选小鹅通协议'
                        : '注册_注册页-知识店铺_取消勾选小鹅通协议'
                "
                >我已阅读并同意</label
            >
            <a
                href="https://admin.xiaoe-tech.com/charge_protocol_page"
                target="_blank"
                @click="clickAgreement"
                >《<span>小鹅通服务协议</span>》</a
            ><a href="https://admin.xiaoe-tech.com/privacy_protocol_page" target="_blank"
                >《<span>个人信息保护政策</span>》</a
            >
        </p>
        <button @click="register" class="register-btn big-button">注册</button>
        <p class="register-des">
            已有账号？
            <a href="javascript:void(0)" @click="login">马上登录</a>
        </p>
        <!-- 老带新活动 -->
        <div class="invite-new" v-if="inviteId && !inGetInviteOldData">
            <div class="bottom-img" v-if="inviteOldValid">
                <img
                    src="http://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/b0868175eddaa7adf222b9e7b58a71d3.png"
                    alt=""
                />
            </div>
            <div class="bg" v-if="!hidePopup">
                <div class="img-box">
                    <img
                        src="http://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/f65508285baef5daa2d28037ae2f9a58.png"
                        alt=""
                    />
                    <img
                        class="icon-close"
                        @click="hidePopup = true"
                        src="http://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/e1b2a6b699d59c31772dc13233bfa39f.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import phone from "../components/input/phone.vue";
import password from "../components/input/password.vue";
import invalidPhone from "../components/input/invalidPhone.vue";
import { userRegister, pwdLogin } from "@/api";
import { slicePhone, checkOverseasPhone } from "@/utils";
import { ACCOUNT_ERR_MESSAGE, } from "@/constants";

export default {
    components: {
        phone,
        password,
        invalidPhone,
    },
    data() {
        return {
            agreeAgreement: false,
            isAgree: false,
            pwdObj: {
                name: "设置密码：6-16位字符，包含字母和数字",
                isError: false,
                errorTip: "密码为6-16位，必须包含数字和字母",
                maxLength: 16,
                pwd: "",
                isFocus: false,
                poinDataName: "PC_new_注册页",
                sensorsName: "注册_注册页-知识店铺_点击设置密码",
            },
            invalidPhoneObj: {
                name: "验证码",
                isError: false,
                errorTip: "请输入正确的验证码",
                maxLength: 6,
                veriCode: "",
                isFocus: false,
                phone: "",
                poinDataName: "PC_new_注册页",
                pageName: "注册",
                sensorsName: "注册_注册页-知识店铺_获取验证码",
                placeholder: "请输入验证码",
            },
            inviteId: null, // 老带新活动的邀请者id，没有id
            inviteOldValid: true, // true:老带新活动没过期，老带新活动过期
            hidePopup: true, // 是否展示老带新活动过期弹窗
            inGetInviteOldData: true, // 是否正在获取老带新活动的数据中
            phoneNumber: "",
            registerTitle: "立即创建知识店铺",
            session_id:""
        };
    },
    created() {
        window.document.title = "小鹅通-注册";
        if (this.$route.query.from) {
            let from = this.$route.query.from;
            //判断是否为企业直播店铺
            if (from == "qyzb") {
                this.registerTitle = "立即创建企业直播店铺";
            }
        }
    },
    methods: {
        // 获取链接中的Search字符串中的参数
        getRequest(url, key) {
            var theRequest = {},
                str = "",
                index = url.indexOf("?");
            if (index !== -1) {
                str = url.substr(index + 1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(
                        strs[i].split("=")[1]
                    );
                }
            }
            return theRequest[key];
        },
        /**
         * login 登录
         */
        login() {
            this.$router.push("/account");
        },
        /**
         * register 注册
         */
        async register() {
            if (!checkOverseasPhone(this.phoneNumber)) return;
            if (this.invalidPhoneObj.veriCode.length != 6) {
                this.invalidPhoneObj.isError = true;
            } else if (
                !/^(?=.*[A-Za-z])(?=.*\d)(.{6,16})$/.test(this.pwdObj.pwd)
            ) {
                this.pwdObj.isError = true;
            } else if (!this.agreeAgreement) {
                this.isAgree = true;
                this.$message.warning("请您先勾选服务协议");
            } else if (this.invalidPhoneObj.veriCode != "") {
                if( !this.session_id ){
                    return this.$message.warning('请先获取验证码')
                }
                const [err, res] = await userRegister({
                    ...slicePhone(this.phoneNumber),
                    password: this.pwdObj.pwd,
                    code: this.invalidPhoneObj.veriCode,
                    session_id:this.session_id
                });
                if (!err) {
                    this.loginReq();
                } else {
                    if (ACCOUNT_ERR_MESSAGE[err.code]) {
                        this.$refs.ssInput.handleError(
                            ACCOUNT_ERR_MESSAGE[err.code]
                        );
                    } else {
                        this.$message.warning(
                            err.msg || "服务器异常，请稍候重试"
                        );
                    }
                }
            }
        },
        async loginReq() {
            const [err, res] = await pwdLogin({
                ...slicePhone(this.phoneNumber),
                password: this.pwdObj.pwd,
                auto_login:1,
                verification_type:1,
                id:'1',
                answer:"1",
                session_id:"1"
            });
            if (!err) {
                let data = res.data;
                localStorage.setItem("xe_username", this.phoneNumber);
                localStorage.setItem("token", data.token);
                localStorage.setItem("b_user_id", data.b_user_id);
                localStorage.setItem(
                    "user_account_avatar",
                    data.user_account_avatar
                );
                this.$router.push("/");
            } else {
                this.$message.warning(err.msg || "服务器异常，请稍候重试");
            }
        },
        /**
         * handlePwdBlur 处理密码失去焦点事件
         */
        handlePwdBlur(info) {
            if (
                info.pwd.length &&
                !/^(?=.*[A-Za-z])(?=.*\d)(.{6,16})$/.test(info.pwd)
            ) {
                info.isError = true;
                info.isFocus = true;
            } else if (!info.pwd) {
                info.isFocus = false;
                info.isError = true;
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
            const {msg,code} = err
            if(code === 10006){
                this.invalidPhoneObj.errorTip = "短信发送太频繁，请稍后再试";
                this.invalidPhoneObj.isError = true;
            } else if(msg){
                this.$refs.ssInput.handleError(msg)
            }else {
                this.$message.warning('服务器异常，请稍候重试')
            }
        },
        /**
         * clickAgreement 点击协议
         */
        clickAgreement() {},
        handleReport() {
            this.$refs.ssInput.handleError("");
        },
        handleBlur() {
            this.invalidPhoneObj.phone = this.phoneNumber;
            const { ssInput } = this.$refs;
            !checkOverseasPhone(ssInput.phoneNumber)
                ? ssInput.handleError("请输入正确的帐号")
                : ssInput.handleError("");
        },
        onValidInit({session_id}){
            this.session_id = session_id
        }
    },
};
</script>

<style lang="scss" scoped>
.register-wrapper {
    a {
        // color: #999999;
        font-size: 12px;
    }
    .register-title {
        position: relative;
        margin: 0;
        font-size: 18px;
        color: #333;
        text-align: center;
        padding-top: 0;
        .register-title-line {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            display: inline-block;
            width: 40px;
            height: 2px;
            background-color: #105cfb;
        }
    }
    .register-input-list {
        margin-top: 32px;
    }
    .register-input-item {
        margin-bottom: 25px;
    }
    .register-input-list .register-input-item:last-child {
        margin-bottom: 20px;
    }
    .register-btn {
        width: 360px;
        height: 48px;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 48px;
        border: none;
        cursor: pointer;
        color: #fff;
        background-color: #105cfb;
        outline: none;
        &:hover {
            background-color: #136ffe;
        }
    }
    .register-des {
        margin: 0;
        text-align: center;
        color: #666;
        font-size: 13px;
        a {
            color: #105cfb;
            font-size: 13px;
        }
    }
    .register-operate {
        margin: 0;
        margin-bottom: 32px;
        line-height: 14px;
        display: flex;
        align-items: center;
        width: 380px;
        color: #999999;
        font-size: 12px;
    }
}
</style>
