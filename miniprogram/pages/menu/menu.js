Page({
  data: {
    categories: ['素菜小炒类', '荤菜/炖菜类', '鸡/蛋类', '鱼虾海鲜类', '减脂餐'],
    dishes: [
      { id: 'dish-1', name: '蒜蓉娃娃菜', category: '素菜小炒类', status: '上架', sales: 0 },
      { id: 'dish-2', name: '蒜蓉茄子', category: '素菜小炒类', status: '上架', sales: 0 },
      { id: 'dish-3', name: '清炒山药', category: '素菜小炒类', status: '上架', sales: 0 },
      { id: 'dish-4', name: '红烧排骨', category: '荤菜/炖菜类', status: '暂不可做', sales: 0 },
      { id: 'dish-5', name: '番茄炒蛋', category: '鸡/蛋类', status: '上架', sales: 0 }
    ]
  },

  addRecipe() {
    wx.showToast({ title: '下一阶段接入新增菜品', icon: 'none' });
  },

  editDish() {
    wx.showToast({ title: '下一阶段接入编辑菜品', icon: 'none' });
  }
});
