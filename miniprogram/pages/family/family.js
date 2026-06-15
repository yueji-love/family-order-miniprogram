Page({
  data: {
    familyName: '测试家庭',
    inviteCode: '',
    roleHint: '主理人创建家庭后，成员用邀请码加入。'
  },

  onFamilyNameInput(event) {
    this.setData({ familyName: event.detail.value });
  },

  onInviteCodeInput(event) {
    this.setData({ inviteCode: event.detail.value });
  },

  createFamily() {
    wx.showToast({
      title: '下一阶段接入',
      icon: 'none'
    });
  },

  joinFamily() {
    wx.showToast({
      title: '下一阶段接入',
      icon: 'none'
    });
  }
});
