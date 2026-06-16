const { getDefaultMeal } = require('../../utils/meal-time');
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
  { id: 'dish-1', category: '素菜小炒类', name: '蒜蓉娃娃菜', sales: 0, color: '#ffd47d', thumb: '娃', selected: 0 },
  { id: 'dish-2', category: '素菜小炒类', name: '蒜蓉茄子', sales: 0, color: '#b98cff', thumb: '茄', selected: 0 },
  { id: 'dish-3', category: '素菜小炒类', name: '清炒山药', sales: 0, color: '#e9ddc7', thumb: '山', selected: 0 },
  { id: 'dish-4', category: '素菜小炒类', name: '清炒黄瓜', sales: 0, color: '#8fe08a', thumb: '瓜', selected: 0 },
  { id: 'dish-5', category: '素菜小炒类', name: '清炒紫甘蓝', sales: 0, color: '#b66bea', thumb: '紫', selected: 0 },
  { id: 'dish-6', category: '素菜小炒类', name: '清炒胡萝卜', sales: 0, color: '#ff9a55', thumb: '胡', selected: 0 },
  { id: 'dish-7', category: '荤菜/炖菜类', name: '红烧排骨', sales: 0, color: '#d96d50', thumb: '排', selected: 0 },
  { id: 'dish-8', category: '荤菜/炖菜类', name: '番茄牛腩', sales: 0, color: '#ff705c', thumb: '牛', selected: 0 },
  { id: 'dish-9', category: '鸡/蛋类', name: '番茄炒蛋', sales: 0, color: '#ffc24a', thumb: '蛋', selected: 0 },
  { id: 'dish-10', category: '鱼虾海鲜类', name: '清蒸鲈鱼', sales: 0, color: '#79c7ef', thumb: '鱼', selected: 0 },
  { id: 'dish-11', category: '热饮类', name: '牛奶+包子', sales: 0, color: '#f1dfba', thumb: '奶', selected: 0 },
  { id: 'dish-12', category: '减脂餐', name: '鸡胸肉沙拉', sales: 0, color: '#77d99a', thumb: '轻', selected: 0 }
];

Page({
  data: {
    loading: false,
    user: null,
    hasFamily: true,
    role: '主理人',
    roleId: 'CHEF-1001',
    memberId: 'MEM-2048',
    familyId: 'HOME-0616',
    familyName: '测试家庭',
    defaultMeal: null,
    categories,
    currentCategory: categories[0],
    dishes,
    visibleDishes: [],
    cartCount: 0,
    cartItems: [],
    cartPreview: '还没选菜',
    submitText: '下单',
    searchKeyword: '',
    isSearching: false,
    listTitle: `${categories[0]}(6)`
  },

  onLoad() {
    this.setData({ defaultMeal: getDefaultMeal() });
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
    const cartPreview = cartItems.length
      ? cartItems.slice(0, 2).map((dish) => `${dish.name}x${dish.selected}`).join('、')
      : '还没选菜';
    const submitText = cartCount === 0 ? '下单' : `下单 ${cartCount}`;

    this.setData({ dishes: dishesNext, cartItems, cartCount, cartPreview, submitText }, () => {
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
        }
      }
    });
  },

  copyId(event) {
    const value = event.currentTarget.dataset.value;
    wx.setClipboardData({ data: value });
  },

  goCart() {
    wx.navigateTo({ url: '/pages/cart/cart' });
  },

  goFamily() {
    wx.navigateTo({ url: '/pages/family/family' });
  },

  goMenuManage() {
    wx.navigateTo({ url: '/pages/menu/menu' });
  },

  goProfile() {
    wx.switchTab({ url: '/pages/profile/profile' });
  }
});
