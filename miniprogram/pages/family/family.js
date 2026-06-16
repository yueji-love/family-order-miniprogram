Page({
  data: {
    familyName: '测试家庭',
    inviteCode: '',
    roleHint: '主理人先创建家庭，再把邀请码发给成员。成员加入后，大家会看到同一顿饭的点菜结果。'
  },

  onFamilyNameInput(event) {
    this.setData({ familyName: event.detail.value });
  },

  onInviteCodeInput(event) {
    this.setData({ inviteCode: event.detail.value });
  },

  createFamily() {
    wx.showToast({
      title: '下一阶段接入创建家庭',
      icon: 'none'
    });
  },

  joinFamily() {
    wx.showToast({
      title: '下一阶段接入加入家庭',
      icon: 'none'
    });
  }
});
