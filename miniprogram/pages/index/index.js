const { getDefaultMeal } = require('../../utils/meal-time');
const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    loading: false,
    user: null,
    defaultMeal: null,
    shortcuts: [
      { title: '创建家庭', desc: '主理人先建一个家' },
      { title: '一起点菜', desc: '成员共建同一餐' },
      { title: '采购勾选', desc: '买到一项勾一项' }
    ],
    message: '把一家人的想吃、要买、已买齐，放进同一个清清楚楚的小流程里。'
  },

  onLoad() {
    this.setData({ defaultMeal: getDefaultMeal() });
    this.login();
  },

  onShow() {
    setTabBar(this, 0);
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
