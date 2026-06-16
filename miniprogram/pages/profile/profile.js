const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    roleName: '主理人',
    familyName: '测试家庭',
    managerActions: [
      { title: '家庭组管理', desc: '邀请成员、查看成员、管理家庭信息', url: '/pages/family/family' },
      { title: '菜单管理', desc: '上传菜品图片、维护分类、修改食材用量', url: '/pages/menu/menu' },
      { title: '采购设置', desc: '查看采购清单，后续接入已买勾选记录', url: '/pages/purchase/purchase', tab: true }
    ],
    memberTips: [
      '成员可以点菜、查看这一顿大家点了什么。',
      '菜品所需食材只给主理人看，成员不会看到配方。',
      '一个家庭只有一位主理人。'
    ]
  },

  onShow() {
    setTabBar(this, 3);
  },

  goAction(event) {
    const action = this.data.managerActions[event.currentTarget.dataset.index];
    if (action.tab) {
      wx.switchTab({ url: action.url });
      return;
    }
    wx.navigateTo({ url: action.url });
  }
});
