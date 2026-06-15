App({
  globalData: {
    envId: 'cloudbase-d5gqwzapedf06f059',
    user: null,
    currentFamily: null
  },

  onLaunch() {
    if (!wx.cloud) {
      wx.showModal({
        title: '启动失败',
        content: '当前微信版本过低，暂不支持云开发能力。',
        showCancel: false
      });
      return;
    }

    wx.cloud.init({
      env: this.globalData.envId,
      traceUser: true
    });
  }
});
