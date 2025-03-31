import { data } from '../consts/hotelsArray.js';

export const YEAR = 2020;

export const deepEqual = (object1, object2) => {
  for (const [key, value] of Object.entries(object1)) {
    if (key in object2) {
      if (typeof object2[key] === 'object') {
        if (!deepEqual(value, object2[key])) {
          return false;
        }
      } else {
        if (value !== object2[key]) {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return true;
};

export const palindrome = (string) =>
  string === string.split('').reverse().join('');

export const searchHotel = (str) => {
  const re = new RegExp(str, 'i');
  return data
    .filter((hotel) =>
      re.test([hotel.country, hotel.city, hotel.name].join(', ')),
    )
    .map((hotel) => [hotel.country, hotel.city, hotel.name].join(', '));
};

export const groupCities = () => {
  return data.reduce((acc, item) => {
    if (!acc[item.country]) {
      acc[item.country] = [];
    }
    // Чтобы не повторялись города
    if (!acc[item.country].includes(item.city)) {
      acc[item.country].push(item.city);
    }
    return acc;
  }, {});
};

export const getCalendarMonth = (today = new Date()) => {
  const daysInWeek = 7;

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const daysInMonth = new Date(todayYear, todayMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(todayYear, todayMonth, 0).getDay();
  const daysInPreviousMonth = new Date(todayYear, todayMonth, 0).getDate();

  const month = [];
  let count = 1 - firstDayOfMonth;

  while (count <= daysInMonth) {
    const week = [];
    for (let i = 0; i < daysInWeek; i++) {
      const day = {};
      if (count > 0 && count <= daysInMonth) {
        day.dayOfMonth = count;
        day.notCurrentMonth = false;
      } else {
        day.dayOfMonth =
          count <= 0 ? count + daysInPreviousMonth : count - daysInMonth;
        day.notCurrentMonth = true;
      }
      day.selectedDay = false;
      day.currentDay = count++ === todayDate && !day.notCurrentMonth;
      week.push(day);
    }
    month.push(week);
  }
  return month;
};

export const convertDate = (date) => {
  const re = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  return date.replace(re, '$3.$2.$1').replace(/(\b\d\b)/g, '0$1');
};

export const sum = (num1) => {
  return (num2) => {
    return num1 + num2;
  };
};

export const colors = {
  data: ['magenta', 'cyan', 'firebrick', 'springgreen', 'skyblue'],
  index: -1,
  [Symbol.iterator]() {
    return this;
  },
  next() {
    return ++this.index % data.length;
  },
};

export function getColor() {
  return colors.data[colors.next()];
}
