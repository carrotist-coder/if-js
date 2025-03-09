import { data } from '../consts/hotelsArray.js';

export const palindrome = (string) =>
  string === string.split('').reverse().join('');

export const searchHotel = (str) => {
  const re = new RegExp(str, 'i');
  return data
    .filter((hotel) =>
      re.test([hotel.country, hotel.city, hotel.hotel].join(', ')),
    )
    .map((hotel) => [hotel.country, hotel.city, hotel.hotel].join(', '));
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

export const getCalendarMonth = (daysInMonth, daysInWeek, dayOfWeek) => {
  const month = [];
  let count = daysInMonth - dayOfWeek;
  while (count <= 2 * daysInMonth) {
    const week = [];
    for (let i = 0; i < daysInWeek; i++) {
      week.push((count++ % daysInMonth) + 1);
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

export const colors = [
  'magenta',
  'cyan',
  'firebrick',
  'springgreen',
  'skyblue',
];

export function getColor(index) {
  return colors[index % colors.length];
}
