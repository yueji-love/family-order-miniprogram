const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    categories: ['家常菜', '快手菜', '汤羹', '下午茶'],
    currentCategory: '家常菜',
    dishes: [
      { id: 'demo-1', name: '番茄炒蛋', initial: '番', tag: '酸甜 快手', count: 0, status: '上架' },
      { id: 'demo-2', name: '青椒肉丝', initial: '青', tag: '下饭 家常', count: 0, status: '上架' },
      { id: 'demo-3', name: '红烧排骨', initial: '红', tag: '硬菜', count: 0, status: '暂不可做' }
    ],
    cartCount: 0
  },

  onShow() {
    setTabBar(this, 1);
  },

  selectCategory(event) {
    this.setData({ currentCategory: event.currentTarget.dataset.name });
  },

  addDish(event) {
    const status = event.currentTarget.dataset.status;
    if (status !== '上架') {
      wx.showToast({ title: '这道菜暂不可做', icon: 'none' });
      return;
    }

    this.setData({ cartCount: this.data.cartCount + 1 });
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  },

  goCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  }
});
