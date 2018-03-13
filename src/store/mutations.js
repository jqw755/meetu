/**
 * Created by jingqw on 18/3/12.
 */
const mutations = {
  LOADING: (state, b) => {
    state.showLoading = b;
  },
  SETTITLE: (state, t) => {
    state.title = t;
    document.title = state.title;
  },
  SHOWNOTICE: (state, params) => {
    state.noticeOptions = {
      isShow: params.isShow,  //显示/隐藏
      title: params.title,  //弹窗标题
      message: params.message,  //内容
      btnCancelText: params.btnCancelText,  //取消按钮文案
      btnConfirmText: params.btnConfirmText,  //确定按钮文案
      noCancel: params.noCancel,  //是否显示取消按钮
      cancelFun: params.cancelFun,  //取消回调
      confirmFun: params.confirmFun  //确定回调
    }
  },
  SHOWTOAST: (state, p) => {
    state.toastOptions = {
      isShow: p.isShow,  //是否显示
      message: p.message,  //内容
      // toastFun: p.toastFun  //回调
    }
  }
}

export default mutations;
