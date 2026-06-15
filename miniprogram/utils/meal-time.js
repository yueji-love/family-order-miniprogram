function pad(value) {
  return value < 10 ? `0${value}` : `${value}`;
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function getDefaultMeal(now = new Date()) {
  const hour = now.getHours();
  const minute = now.getMinutes();
  const totalMinutes = hour * 60 + minute;
  const today = new Date(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (totalMinutes >= 5 * 60 && totalMinutes < 10 * 60) {
    return { mealDate: formatDate(today), mealType: 'breakfast', mealTypeName: '早餐' };
  }

  if (totalMinutes >= 10 * 60 && totalMinutes < 12 * 60) {
    return { mealDate: formatDate(today), mealType: 'lunch', mealTypeName: '午餐' };
  }

  if (totalMinutes >= 12 * 60 && totalMinutes < 15 * 60) {
    return { mealDate: formatDate(today), mealType: 'tea', mealTypeName: '下午茶' };
  }

  if (totalMinutes >= 15 * 60 && totalMinutes < 18 * 60) {
    return { mealDate: formatDate(today), mealType: 'dinner', mealTypeName: '晚餐' };
  }

  return { mealDate: formatDate(tomorrow), mealType: 'breakfast', mealTypeName: '早餐' };
}

module.exports = {
  getDefaultMeal,
  formatDate
};
