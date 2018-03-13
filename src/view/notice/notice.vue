<template>
    <div class="notice_wrap" v-show="noticeOptions.isShow">
        <div class="model">
            <div class="mask" v-show="noticeOptions.isShow"></div>
            <div :class="['modelBox',noticeOptions.isShow?'rollIn':'rollOut']">
                <!--<p class="closeModel" @click="closeModel"></p>-->
                <p class="title">{{noticeOptions.title || "提示"}}</p>
                <p class="message">{{noticeOptions.message || " "}}</p>
                <div class="model_btnBox" v-if="noticeOptions.noCancel">
                    <p @click="modelConfirm">确定</p>
                </div>
                <div class="model_btnBox" v-else>
                    <button class="btn btn_cancel" @click="modelCancel">
                        {{noticeOptions.btnCancelText || "取消"}}
                    </button>
                    <span>|</span>
                    <button class="btn btn_confirm" @click="modelConfirm">
                        {{noticeOptions.btnConfirmText || "确定"}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            noticeOptions: {}
        },
        data() {
            return {}
        },
        methods: {
            closeModel: function () {
                const self = this;
                self.noticeOptions.isShow = false;
            },
            showModel: function () {
                const self = this;
                self.noticeOptions.isShow = true;
            },
            modelCancel: function () {
                const self = this;
                self.noticeOptions.isShow = false;
                if (typeof (self.noticeOptions.cancelFun) === 'function') {
                    self.noticeOptions.cancelFun()
                }
            },
            modelConfirm: function () {
                const self = this;
                self.noticeOptions.isShow = false;
                if (typeof (self.noticeOptions.confirmFun) === 'function') {
                    self.noticeOptions.confirmFun()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/notice/notice';
</style>