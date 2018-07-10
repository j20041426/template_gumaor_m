global.common = {
  API_URL: process.env.API_URL,
  AUTH_URL: process.env.AUTH_URL,

  loading: null,
  scrollTop: 0,

  jumpAuth() {
    common.setStore("jump_url", window.location.href);
    common.removeStore('token');
    window.location.href = common.AUTH_URL;
  },

  init(callback) {
    // TODO 授权验证
    callback();
  },

  //设置页面title
  setTitle(title) {
    document.title = title || '博物馆智慧报表';
    common.hackTitle();
  },
  //解决ios中js设置document.title 的bug
  hackTitle() {
    var $body = $('body');
    var $iframe = $('<iframe style="position:absolute; left:-9999px; top:-9999px;" src="http://static.tangdaoyou.com/favicon.ico"></iframe>');
    $iframe.on('load', function () {
      setTimeout(function () {
        $iframe.off('load').remove();
      }, 100);
    }).appendTo($body);
  },
  //获取地址栏URL参数
  getUrlParams(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    let url = window.location.href;
    let urlArr = url.split("#");
    url = urlArr[1];
    urlArr = url.split("?");
    url = urlArr[1];

    if (url) {
      var r = url.match(reg);
      if (r != null) return unescape(r[2]);
    }
    return null;
  },
  //当前环境是否是微信浏览器
  isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  
  showLoading(msg) {
    vue.$indicator.open({
      spinnerType: 'snake',
      text: msg
    });
    setTimeout(() => {
      common.hideLoading();
    }, 5000);
  },
  hideLoading() {
    vue.$indicator.close();
  },
  toast(msg, position, duration) {
    vue.$toast({
      message: msg,
      position: position,
      duration: duration
    });
  },
  alert(msg, cb = null) {
    vue.$messagebox.alert(msg, '温馨提示').then(action => {
      cb && cb();
    });
  },
  confirm(msg, ok = null, cancel = null) {
    vue.$messagebox.confirm(msg, '温馨提示').then(action => {
      ok && ok();
    }).catch((action) => {
      cancel && cancel();
    });
  },
  prompt(msg, title, cb) {
    vue.$messagebox.prompt(msg, title).then(({
      value,
      action
    }) => {
      cb && cb(value);
    }).catch((action) => {
      //cancel, do nothing...
    });
  },
  notfound: function () {
    common.alert("您所访问的资源不存在！");
  },

  getH() {
    return document.body.clientHeight;
  },
  getW() {
    return document.body.clientWidth;
  },
  pageScrollTo(val) {
    document.body.scrollTop = val;
    document.documentElement.scrollTop = val;
  },
  disableBodyScroll() {
    common.scrollTop = window.scrollY;
    document.body.parentNode.style.overflowY = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.body.scrollTop = common.scrollTop;
    document.documentElement.scrollTop = common.scrollTop;
  },
  enableBodyScroll() {
    document.body.parentNode.style.overflowY = '';
    document.body.style.overflowY = '';
    document.body.scrollTop = common.scrollTop;
    document.documentElement.scrollTop = common.scrollTop;
  },
  mkQiniuKey(prefix = '') {
    var num = "";
    for (var i = 0; i < 9; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return prefix + moment().unix() + '' + num;
  }
};

export default common;
