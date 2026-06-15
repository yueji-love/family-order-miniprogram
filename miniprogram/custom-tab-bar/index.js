Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '首页', mark: '●' },
      { pagePath: '/pages/menu/menu', text: '点菜', mark: '+' },
      { pagePath: '/pages/meal/meal', text: '餐单', mark: '≡' },
      { pagePath: '/pages/purchase/purchase', text: '采购', mark: '✓' },
      { pagePath: '/pages/profile/profile', text: '我的', mark: '○' }
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
