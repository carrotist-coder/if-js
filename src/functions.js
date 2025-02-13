import { data } from './hotelsArray.js';

export const palindrome = (string) =>
  string === string.split('').reverse().join('');

export const convertDate = (date) => {
  const re = /(\d{4})-(\d{1,2})-(\d{1,2})/;
  return date.replace(re, '$3.$2.$1').replace(/(\b\d\b)/g, '0$1');
};

export const searchHotel = (str) => {
  let hotels = [];
  const re = new RegExp(str, 'i');
  for (let i = 0; i < data.length; i++) {
    const place = [data[i].country, data[i].city, data[i].hotel].join(', ');
    if (re.test(place)) {
      hotels.push(place);
    }
  }
  return hotels;
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
