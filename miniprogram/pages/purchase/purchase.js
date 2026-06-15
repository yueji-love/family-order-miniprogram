Page({
  data: {
    groups: [
      {
        name: '蔬菜区',
        items: [
          { name: '番茄', amount: '4', unit: '个', checked: false },
          { name: '小葱', amount: '1', unit: '把', checked: true, checkedByName: 'bo' }
        ]
      },
      {
        name: '肉蛋水产区',
        items: [
          { name: '鸡蛋', amount: '6', unit: '个', checked: false }
        ]
      }
    ]
  }
});
