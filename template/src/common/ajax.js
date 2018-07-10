global.ajax = {
  get(url, data, cb) {
    vue.$axios({
      url: common.API_URL + url,
      method: 'get',
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Token': store.get('token') || ''
      }
    }).then((res) => {
      if (res.data.code == 404) {
        common.hideLoading();
        common.alert('系统出了点问题，请联系技术小哥~');
      } else {
        cb && cb(res.data);
      }
    });
  },
  post(url, data, cb) {
    vue.$axios({
      url: common.API_URL + url,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Token': store.get('token') || ''
      }
    }).then((res) => {
      if (res.data.code == 404) {
        common.hideLoading();
        common.alert('系统出了点问题，请联系技术小哥~');
      } else {
        cb && cb(res.data);
      }
    });
  },
  put(url, data, cb) {
    vue.$axios({
      url: common.API_URL + url,
      method: 'put',
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Token': store.get('token') || ''
      }
    }).then((res) => {
      if (res.data.code == 404) {
        common.hideLoading();
        common.alert('系统出了点问题，请联系技术小哥~');
      } else {
        cb && cb(res.data);
      }
    });
  },
  delete(url, data, cb) {
    vue.$axios({
      url: common.API_URL + url,
      method: 'delete',
      params: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Token': store.get('token') || ''
      }
    }).then((res) => {
      if (res.data.code == 404) {
        common.hideLoading();
        common.alert('系统出了点问题，请联系技术小哥~');
      } else {
        cb && cb(res.data);
      }
    });
  },
  getAll(requests, cb) {
    let gets = [];
    for (let request of requests) {
      gets.push(vue.$axios({
        url: common.API_URL + request.url,
        method: 'get',
        params: request.data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Token': store.get('token') || ''
        }
      }));
    }
    vue.$axios.all(gets).then(vue.$axios.spread((...res) => {
      let result = [];
      res.forEach((v) => {
        result.push(v.data)
      });
      cb && cb(...result);
    }));
  }
}
