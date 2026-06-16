const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    groups: [
      {
        name: '蔬菜区',
        items: [
          { name: '娃娃菜', amount: '2', unit: '颗', checked: false },
          { name: '小葱', amount: '1', unit: '把', checked: true, checkedByName: '妈妈' }
        ]
      },
      {
        name: '肉蛋水产区',
        items: [
          { name: '鸡蛋', amount: '6', unit: '个', checked: false }
        ]
      }
    ]
  },

  onShow() {
    setTabBar(this, 2);
  }
});
