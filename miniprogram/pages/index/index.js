Page({
  data: {
    loading: false,
    user: null,
    message: '先把家庭建起来，再开始一起点今天这顿饭。'
  },

  onLoad() {
    this.login();
  },

  login() {
    this.setData({ loading: true });

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        const result = res.result || {};
        getApp().globalData.user = result.user || null;
        this.setData({
          user: result.user || null,
          loading: false
        });
      },
      fail: () => {
        this.setData({ loading: false });
        wx.showToast({
          title: '登录验证失败',
          icon: 'none'
        });
      }
    });
  },

  goFamily() {
    wx.navigateTo({ url: '/pages/family/family' });
  },

  goMenu() {
    wx.switchTab({ url: '/pages/menu/menu' });
  }
});
