const { getDefaultMeal } = require('../../utils/meal-time');
const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    loading: false,
    user: null,
    defaultMeal: null,
    tabs: ['听天由命', '家庭餐单'],
    currentTab: 0,
    wheelItems: [
      { name: '番茄炒蛋', rotate: 0 },
      { name: '青椒肉丝', rotate: 45 },
      { name: '可乐鸡翅', rotate: 90 },
      { name: '红烧排骨', rotate: 135 },
      { name: '鱼香肉丝', rotate: 180 },
      { name: '清蒸鲈鱼', rotate: 225 },
      { name: '牛奶包子', rotate: 270 },
      { name: '热干面', rotate: 315 }
    ],
    chips: [
      '早餐菜单',
      '午餐菜单',
      '晚餐菜单',
      '家常菜',
      '清淡一点',
      '随机来一道'
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

  switchHomeTab(event) {
    this.setData({ currentTab: Number(event.currentTarget.dataset.index) });
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
