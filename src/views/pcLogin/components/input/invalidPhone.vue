<template>
    <div class="invalidPhoneWrapper">
        <p :class="['inputText', { inputTextFocus: invalidPhoneInfo.isFocus }]">
            {{ invalidPhoneInfo.name }}
        </p>
        <div class="inputBox" :class="[{ alert: invalidPhoneInfo.isError }]">
            <input
                :maxlength="invalidPhoneInfo.maxLength"
                @blur="handleBlur"
                @focus="handleFocus"
                v-model="invalidPhoneInfo.veriCode"
                type="text"
            />
            <p class="inputAlert hasTitle" v-html="invalidPhoneInfo.errorTip" />
        </div>
        <div class="verify-code-box">
            <!-- <sms-verify
                ref="SmsVerify"
                :phone="invalidPhoneInfo.phone"
                @success="handleSuccess"
                @fail="handleFail"
                :verifyTypeRequest="verifyTypeRequest"
                :beforeVerify="beforeVerify"
            ></sms-verify> -->
        </div>
    </div>
</template>

<script>
// import { SmsVerify } from "@xiaoe/sense";
import { fetchVerification } from "@/api";
import { checkOverseasPhone } from "@/utils";

export default {
    props: {
        invalidPhoneObj: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    components: {
        // SmsVerify,
    },
    data() {
        return {
            invalidPhoneInfo: this.invalidPhoneObj,
            session_id: "",
        };
    },
    mounted() {},
    methods: {
        verifyTypeRequest() {
            return new Promise(async (resolve, reject) => {
                const [err, res] = await fetchVerification();
                if (!err) {
                    const {
                        CaptchaAppId: appid,
                        types: type,
                        session_id: sessionId,
                    } = res.data;
                    this.session_id = sessionId;
                    resolve({ appid, type, sessionId });
                    this.$emit("init", res.data);
                } else {
                    reject();
                    this.$message.error(err.msg || "网络繁忙，请稍后再试");
                }
            });
        },
        handleSuccess(data) {
            // this.invalidPhoneInfo.errorTip = "";
            this.invalidPhoneInfo.isError = false;
        }, //errMsg发送短信失败的提示文案
        handleFail(errMsg, data) {
            this.invalidPhoneInfo.errorTip = errMsg;
            this.invalidPhoneInfo.isError = true;
        },
        /**
         * handleBlur 处理失去焦点事件
         */
        handleBlur() {
            this.$emit("handleInvalidBlur", this.invalidPhoneInfo);
        },
        invalidPhone(err) {
            this.$emit("handleInvalidErr", err);
        },
        /**
         * handleFocus 处理获取焦点事件
         */
        handleFocus() {
            this.invalidPhoneInfo.isError = false;
            this.invalidPhoneInfo.isFocus = true;
        },
        beforeVerify() {
            return !!checkOverseasPhone(this.invalidPhoneInfo.phone);
        },
    },
};
</script>

<style lang="scss" scoped>
.invalidPhoneWrapper {
    color: #353535;
    position: relative;
    .verify-code-box {
        position: relative;
        top: -40px;
        z-index: 1;
    }
}
$blue: #1472ff;
.slide-wrapper-custom {
    position: absolute;
    // bottom: 130px;
    top: 15vh;
    // left: 60px;
    z-index: 10;
    display: flex;
    justify-content: center;
    padding-top: 25px;
    width: 380px;
    height: 270px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 0px rgba(115, 115, 115, 0.2);
    border-radius: 4px;
    // &::before {
    //     position: absolute;
    //     bottom: -5px;
    //     left: 50%;
    //     z-index: 5;
    //     content: "";
    //     width: 12px;
    //     height: 12px;
    //     background-color: #fff;
    //     box-shadow: 1px 1px 2px -1px rgba(115, 115, 115, 0.2);
    //     transform: translateX(-50%) rotate(45deg);
    // }
    .slide-img {
        position: absolute;
        top: 11px;
        right: 11px;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
}
.blueBtn {
    display: inline-block;
    text-align: center;

    background: #fff;

    color: #2a75ed;
    cursor: pointer;
    &.grey {
        color: #b2b2b2;
        border-color: #b2b2b2;
        cursor: auto;
        &:hover {
            color: #b2b2b2 !important;
            background: transparent !important;
        }
        &:active {
            color: #b2b2b2 !important;
            background: transparent !important;
        }
    }
}
.verify-code-box {
    float: right;
}

.blueBtn {
    width: 104px;
    height: 36px;
    border-radius: 22px;
    border: solid 1px #2a75ed;
    line-height: 34px;
    font-size: 12px;
}

.verify-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    .verify-box {
        position: relative;
        display: flex;
        justify-content: center;
        padding-top: 25px;
        width: 360px;
        height: 270px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 10px 0px rgba(115, 115, 115, 0.2);
        border-radius: 4px;
    }
    .verify-img {
        position: absolute;
        top: 11px;
        right: 11px;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
}

.verify-window {
    padding: 20px;
    width: 300px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    text-align: left;
    z-index: 5;
    .code-text {
        font-size: 18px;
        color: #333;
        line-height: 24px;
        margin: 0;
        margin-bottom: 20px;
    }
    .img-code-item {
        margin-bottom: 20px;
        display: flex;
        height: 36px;
        align-items: center;
        img,
        input {
            width: 50%;
            margin-right: 10%;
            height: 36px;
            border: 1px solid #ccc;
        }
        input {
            outline: none;
        }
        .blue-text {
            color: #2a75ed;
            cursor: pointer;
        }
    }
    .verify-close {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 16px;
        cursor: pointer;
    }
}

.verify-btn {
    background-color: transparent;
    color: #105cfb;
    &:hover {
        color: #ffffff;
        background: rgba(63, 124, 251, 1);
    }
    &:active {
        color: #ffffff;
        background: rgba(14, 82, 225, 1);
    }
}
.verify-trigger {
    display: inline-block;
    text-align: center;
    color: $blue;
    cursor: pointer;
}
</style>
