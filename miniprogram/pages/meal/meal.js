const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    status: '草稿中',
    dishes: [
      { name: '蒜蓉娃娃菜', addedByName: '爸爸' },
      { name: '清炒山药', addedByName: '孩子' }
    ]
  },

  onShow() {
    setTabBar(this, 1);
  }
});
