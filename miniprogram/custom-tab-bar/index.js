Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', mark: '首' },
      { pagePath: '/pages/menu/menu', text: '点菜', mark: '点' },
      { pagePath: '/pages/meal/meal', text: '餐单', mark: '餐' },
      { pagePath: '/pages/purchase/purchase', text: '采购', mark: '采' },
      { pagePath: '/pages/profile/profile', text: '我的', mark: '我' }
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
