<template>
    <div class="toast_wrap" v-show="watchShow">
        <p :class="[watchShow?'scaleIn':'scaleOut']">{{toastOptions.message}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            toastOptions: {}
        },
        data() {
            return {
                isShow: false
            }
        },
        computed: {
            watchShow() {
                const self = this;
                return self.isShow = this.toastOptions.isShow;
            }
        },
        watch: {
            isShow(b) {
                const self = this;
                if (b === true) {
                    setTimeout(function () {
                        self.toastOptions.isShow = false;
                    }, 3000)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/notice/toast';
</style>