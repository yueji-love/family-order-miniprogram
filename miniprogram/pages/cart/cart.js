const { getDefaultMeal } = require('../../utils/meal-time');
const { setTabBar } = require('../../utils/tab-bar');

Page({
  data: {
    mealDate: '',
    mealType: '',
    mealTypeName: '',
    mealTypes: [
      { key: 'breakfast', name: '早餐' },
      { key: 'lunch', name: '午餐' },
      { key: 'tea', name: '下午茶' },
      { key: 'dinner', name: '晚餐' }
    ],
    servings: 2
  },

  onLoad() {
    const meal = getDefaultMeal();
    this.setData({
      mealDate: meal.mealDate,
      mealType: meal.mealType,
      mealTypeName: meal.mealTypeName
    });
  },

  onShow() {
    setTabBar(this, 0);
  },

  onDateChange(event) {
    this.setData({ mealDate: event.detail.value });
  },

  selectMealType(event) {
    const mealType = event.currentTarget.dataset.key;
    const meal = this.data.mealTypes.find((item) => item.key === mealType);
    this.setData({
      mealType,
      mealTypeName: meal.name
    });
  },

  minusServing() {
    if (this.data.servings <= 1) return;
    this.setData({ servings: this.data.servings - 1 });
  },

  addServing() {
    this.setData({ servings: this.data.servings + 1 });
  },

  submitCart() {
    wx.showToast({
      title: '下一阶段提交到共享餐单',
      icon: 'none'
    });
  }
});
