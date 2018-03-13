export default {
    //截取URL参数
    getQuery: function (name, url) {
        var u = arguments[1] || window.location.search,
            reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            r = u.substr(u.indexOf('\?') + 1).match(reg);
        return r != null ? r[2] : '';
    },
    //大数字转换
    formatBigVal: function (value) {
        if (value < 10000) {return value}
        else if(value < 100000000){
            return (value / 10000).toFixed(1) + "万";
        }else{
            return (value / 100000000).toFixed(1) + "亿";
        }
    },
    //跳转操作后返回上一页
    routerBack: (self,r) => {
        let redirect = decodeURIComponent(self.$route.query.requri || '/');
        // if(r){
        //     self.router.redirect({
        //         path: redirect
        //     });
        // }else{
            self.$router.push({
                path: redirect
            })
        // }
    },
    //检查邮箱
    checkEmail: email => {
        return /^([a-zA-Z0-9-_]*[-_.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/.test(email);
    },
    //检查手机
    checkMobile:
        mobile => {
            return /^1\d{10}$/.test(mobile);
        },
    //两位长度
    subTime: strTime => {
        if (strTime < 10) {
            strTime = '0' + strTime;
        }
        return strTime + '';
    },
    //货币化
    currency: (price, separate = false) => {
        let f = parseFloat(price);
        if (isNaN(f)) {
            return 0;
        }
        f = Math.round(f * 100) / 100;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
            rs = s.length;
            s += '.';
        }
        while (s.length <= rs + 2) {
            s += '0';
        }
        if (separate) {
            return s.split('.');
        }
        return s;
    },
    formatDate: function (time = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
        let date = new Date(time);
        let o = {
            'M+': date.getMonth() + 1, //月份
            'd+': date.getDate(), //日
            'h+': date.getHours(), //小时
            'm+': date.getMinutes(), //分
            's+': date.getSeconds(), //秒
            'q+': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    }

    ,
//获取中文星期
    getDay: (time = Date.now(), prefix = '周') => {
        let str = '日一二三四五六';
        return prefix + str[new Date(time).getDay()];
    },
    //获取字符串长度，区分中英文
    len: (str = '') => {
        let len = 0,
            a = str.split('');
        for (let i = 0; i < a.length; i++) {
            if (a[i].charCodeAt(0) < 299) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },
    //检查详细地址和门牌号
    checkAddress: (str, min, max) => {
        if (str.length < min || str.length > max) {
            return false;
        }
        return !/[~!@#$%^&*\\|"']/.test(str);
    },
    //100000=>10:00:00
    intToStr: function (time, isShort) {
        time = time || 100000;
        time = time.toString();
        return time.substring(0, 2) + ':' + time.substring(2, 4) + (isShort ? '' : ':' + time.substring(4, 6));
    }

    ,

// 根据后台返回时间毫秒数格式化xxxx-xx-xx
//1.补0操作
    getzf: function (num) {
        if (parseInt(num) < 10) {
            num = '0' + num;
        }
        return num;
    }
    ,
// 2.得到年月日
    getMyDate: function (str) {
        let oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay);//最后拼接时间
        return oTime;
    }
    ,
// 3.调用
    formatResTime: function (time) {
        return this.getMyDate(time);
    },

// 活动倒计时
// 格式化数字
    formatNumber: (n) => {
        n = parseInt(n).toString()
        return n[1] ? n : '0' + n
    },
    interval: function (ms) {
        var o = {};
        var days = parseInt(ms / (1000 * 60 * 60 * 24));
        var hours = parseInt((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (ms % (1000 * 60)) / 1000;
        o.day = this.formatNumber(days);
        o.hour = this.formatNumber(hours);
        o.minute = this.formatNumber(minutes);
        o.second = this.formatNumber(seconds);
        return o;
    }

    ,
}
;
