const { setTabBar } = require('../../utils/tab-bar');

const categories = [
  '素菜小炒类',
  '荤菜/炖菜类',
  '鸡/蛋类',
  '牛肉类',
  '猪肉类',
  '鱼虾海鲜类',
  '小炒荤菜类',
  '热饮类',
  '月子水',
  '水果拼盘',
  '常温饮品类',
  '减脂餐'
];

const dishes = [
  { id: 'dish-1', category: '素菜小炒类', name: '蒜蓉娃娃菜', sales: 0, color: '#dfeaa0', thumb: '娃', selected: 0 },
  { id: 'dish-2', category: '素菜小炒类', name: '蒜蓉茄子', sales: 0, color: '#c8b4f4', thumb: '茄', selected: 0 },
  { id: 'dish-3', category: '素菜小炒类', name: '清炒山药', sales: 0, color: '#e8dfcd', thumb: '山', selected: 0 },
  { id: 'dish-4', category: '素菜小炒类', name: '清炒黄瓜', sales: 0, color: '#b9e6a8', thumb: '瓜', selected: 0 },
  { id: 'dish-5', category: '素菜小炒类', name: '清炒紫甘蓝', sales: 0, color: '#bc91e5', thumb: '紫', selected: 0 },
  { id: 'dish-6', category: '素菜小炒类', name: '清炒胡萝卜', sales: 0, color: '#f2b377', thumb: '胡', selected: 0 },
  { id: 'dish-7', category: '荤菜/炖菜类', name: '红烧排骨', sales: 0, color: '#df7e62', thumb: '排', selected: 0 },
  { id: 'dish-8', category: '荤菜/炖菜类', name: '番茄牛腩', sales: 0, color: '#f07a65', thumb: '牛', selected: 0 },
  { id: 'dish-9', category: '鸡/蛋类', name: '番茄炒蛋', sales: 0, color: '#f1c95e', thumb: '蛋', selected: 0 },
  { id: 'dish-10', category: '鱼虾海鲜类', name: '清蒸鲈鱼', sales: 0, color: '#9bcfeb', thumb: '鱼', selected: 0 },
  { id: 'dish-11', category: '热饮类', name: '牛奶+包子', sales: 0, color: '#ebdfc4', thumb: '奶', selected: 0 },
  { id: 'dish-12', category: '减脂餐', name: '鸡胸肉沙拉', sales: 0, color: '#a7daa4', thumb: '轻', selected: 0 }
];

Page({
  data: {
    loading: false,
    user: null,
    hasFamily: true,
    role: '主理人',
    categories,
    currentCategory: categories[0],
    dishes,
    visibleDishes: [],
    cartCount: 0,
    cartItems: [],
    searchKeyword: '',
    isSearching: false,
    cartDrawerVisible: false,
    listTitle: `${categories[0]}(6)`
  },

  onLoad() {
    this.refreshVisibleDishes();
    this.login();
  },

  onShow() {
    setTabBar(this, 0);
  },

  login() {
    this.setData({ loading: true });

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: (res) => {
        const result = res.result || {};
        getApp().globalData.user = result.user || null;
        this.setData({
          user: result.user || null,
          loading: false
        });
      },
      fail: () => {
        this.setData({ loading: false });
      }
    });
  },

  refreshVisibleDishes() {
    const { dishes: allDishes, currentCategory, searchKeyword } = this.data;
    const keyword = searchKeyword.trim();
    const isSearching = keyword.length > 0;
    const visibleDishes = allDishes.filter((dish) => {
      if (isSearching) {
        return dish.name.indexOf(keyword) >= 0 || dish.category.indexOf(keyword) >= 0;
      }
      return dish.category === currentCategory;
    });
    const listTitle = isSearching ? `搜索结果(${visibleDishes.length})` : `${currentCategory}(${visibleDishes.length})`;

    this.setData({ visibleDishes, isSearching, listTitle });
  },

  refreshCart(dishesNext) {
    const cartItems = dishesNext.filter((dish) => dish.selected > 0);
    const cartCount = cartItems.reduce((sum, dish) => sum + dish.selected, 0);

    this.setData({ dishes: dishesNext, cartItems, cartCount }, () => {
      this.refreshVisibleDishes();
    });
  },

  selectCategory(event) {
    this.setData({
      currentCategory: event.currentTarget.dataset.name,
      searchKeyword: ''
    }, () => {
      this.refreshVisibleDishes();
    });
  },

  onSearchInput(event) {
    this.setData({ searchKeyword: event.detail.value }, () => {
      this.refreshVisibleDishes();
    });
  },

  clearSearch() {
    this.setData({ searchKeyword: '' }, () => {
      this.refreshVisibleDishes();
    });
  },

  addDish(event) {
    const id = event.currentTarget.dataset.id;
    const dishesNext = this.data.dishes.map((dish) => {
      if (dish.id !== id) return dish;
      return { ...dish, selected: dish.selected + 1 };
    });

    this.refreshCart(dishesNext);
  },

  reduceDish(event) {
    const id = event.currentTarget.dataset.id;
    const dishesNext = this.data.dishes.map((dish) => {
      if (dish.id !== id) return dish;
      return { ...dish, selected: Math.max(dish.selected - 1, 0) };
    });

    this.refreshCart(dishesNext);
  },

  randomDish() {
    const list = this.data.isSearching ? this.data.visibleDishes : this.data.dishes;
    if (!list.length) {
      wx.showToast({ title: '没有可随机的菜', icon: 'none' });
      return;
    }
    const dish = list[Math.floor(Math.random() * list.length)];
    wx.showModal({
      title: '随机选菜',
      content: `这顿试试：${dish.name}`,
      confirmText: '加入',
      cancelText: '换一个',
      success: (res) => {
        if (res.confirm) {
          this.addDish({ currentTarget: { dataset: { id: dish.id } } });
          this.openCartDrawer();
        }
      }
    });
  },

  openCartDrawer() {
    this.setData({ cartDrawerVisible: true });
  },

  closeCartDrawer() {
    this.setData({ cartDrawerVisible: false });
  },

  goCart() {
    if (!this.data.cartCount) {
      wx.showToast({ title: '先选一道菜', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: '/pages/cart/cart' });
  },

  goFamily() {
    wx.navigateTo({ url: '/pages/family/family' });
  },

  goMenuManage() {
    wx.navigateTo({ url: '/pages/menu/menu' });
  }
});
