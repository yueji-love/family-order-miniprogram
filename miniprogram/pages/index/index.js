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
  { id: 'dish-1', category: '素菜小炒类', name: '蒜蓉娃娃菜', sales: 0, color: '#f6d59b', thumb: '娃', selected: 0 },
  { id: 'dish-2', category: '素菜小炒类', name: '蒜蓉茄子', sales: 0, color: '#8b64be', thumb: '茄', selected: 0 },
  { id: 'dish-3', category: '素菜小炒类', name: '清炒山药', sales: 0, color: '#f1e8d7', thumb: '山', selected: 0 },
  { id: 'dish-4', category: '素菜小炒类', name: '清炒黄瓜', sales: 0, color: '#9bdc92', thumb: '瓜', selected: 0 },
  { id: 'dish-5', category: '素菜小炒类', name: '清炒紫甘蓝', sales: 0, color: '#9a5cc8', thumb: '紫', selected: 0 },
  { id: 'dish-6', category: '素菜小炒类', name: '清炒胡萝卜', sales: 0, color: '#f48643', thumb: '胡', selected: 0 },
  { id: 'dish-7', category: '荤菜/炖菜类', name: '红烧排骨', sales: 0, color: '#9b4637', thumb: '排', selected: 0 },
  { id: 'dish-8', category: '荤菜/炖菜类', name: '番茄牛腩', sales: 0, color: '#e75b44', thumb: '牛', selected: 0 },
  { id: 'dish-9', category: '鸡/蛋类', name: '番茄炒蛋', sales: 0, color: '#f5b13c', thumb: '蛋', selected: 0 },
  { id: 'dish-10', category: '鱼虾海鲜类', name: '清蒸鲈鱼', sales: 0, color: '#7db3d8', thumb: '鱼', selected: 0 },
  { id: 'dish-11', category: '热饮类', name: '牛奶+包子', sales: 0, color: '#eadfc8', thumb: '奶', selected: 0 },
  { id: 'dish-12', category: '减脂餐', name: '鸡胸肉沙拉', sales: 0, color: '#7ebd81', thumb: '轻', selected: 0 }
];

Page({
  data: {
    loading: false,
    user: null,
    hasFamily: true,
    role: '主理人',
    familyName: '测试家庭',
    defaultMeal: null,
    categories,
    currentCategory: categories[0],
    dishes,
    visibleDishes: [],
    cartCount: 0,
    cartItems: [],
    submitText: '下单',
    searchKeyword: ''
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
    const visibleDishes = allDishes.filter((dish) => {
      const matchCategory = dish.category === currentCategory;
      const matchKeyword = !keyword || dish.name.indexOf(keyword) >= 0;
      return matchCategory && matchKeyword;
    });

    this.setData({ visibleDishes });
  },

  selectCategory(event) {
    this.setData({ currentCategory: event.currentTarget.dataset.name }, () => {
      this.refreshVisibleDishes();
    });
  },

  onSearchInput(event) {
    this.setData({ searchKeyword: event.detail.value }, () => {
      this.refreshVisibleDishes();
    });
  },

  addDish(event) {
    const id = event.currentTarget.dataset.id;
    const dishesNext = this.data.dishes.map((dish) => {
      if (dish.id !== id) return dish;
      return { ...dish, selected: dish.selected + 1 };
    });
    const cartItems = dishesNext.filter((dish) => dish.selected > 0);
    const cartCount = cartItems.reduce((sum, dish) => sum + dish.selected, 0);
    const submitText = cartCount === 0 ? '下单' : `下单 ${cartCount}`;

    this.setData({ dishes: dishesNext, cartItems, cartCount, submitText }, () => {
      this.refreshVisibleDishes();
    });
  },

  randomDish() {
    const list = this.data.visibleDishes.length ? this.data.visibleDishes : this.data.dishes;
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
