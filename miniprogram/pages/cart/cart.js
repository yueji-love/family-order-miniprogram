const { getDefaultMeal } = require('../../utils/meal-time');

Page({
  data: {
    mealDate: '',
    mealTypeName: '',
    servings: 2
  },

  onLoad() {
    const meal = getDefaultMeal();
    this.setData({
      mealDate: meal.mealDate,
      mealTypeName: meal.mealTypeName
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
      title: '下一阶段接入餐单',
      icon: 'none'
    });
  }
});
