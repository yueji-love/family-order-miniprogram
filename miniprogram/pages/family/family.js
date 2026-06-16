Page({
  data: {
    familyName: '测试家庭',
    inviteCode: '',
    familyId: 'HOME-0616',
    chefId: 'CHEF-1001',
    memberId: 'MEM-2048',
    roleHint: '主理人先创建家庭，再把家庭 ID 或邀请码发给成员。成员加入后，大家会看到同一顿饭的点菜结果。'
  },

  onFamilyNameInput(event) {
    this.setData({ familyName: event.detail.value });
  },

  onInviteCodeInput(event) {
    this.setData({ inviteCode: event.detail.value });
  },

  copyId(event) {
    wx.setClipboardData({ data: event.currentTarget.dataset.value });
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
