Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '点菜', mark: '厨' },
      { pagePath: '/pages/meal/meal', text: '餐单', mark: '单' },
      { pagePath: '/pages/purchase/purchase', text: '采购', mark: '购' },
      { pagePath: '/pages/profile/profile', text: '我', mark: '我' }
    ]
  },

  methods: {
    switchTab(event) {
      const index = event.currentTarget.dataset.index;
      const item = this.data.list[index];
      wx.switchTab({ url: item.pagePath });
    }
  }
});
