import {
  convertDate,
  getColor,
  palindrome,
  searchHotel,
  sum,
} from './functions.js';

console.log('шалаш: ', palindrome('шалаш')); // true
console.log('яблоко: ', palindrome('яблоко')); // false

const date = '2020-11-26';
console.log(convertDate(date)); // '26.11.2020'

console.log(searchHotel('hotel'));

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');
let textState1 = -1;
let textState2 = -1;
let textState3 = -1;

text1.addEventListener('click', (event) => {
  event.target.style.color = getColor(++textState1);
});

text2.addEventListener('click', (event) => {
  event.target.style.color = getColor(++textState2);
});

text3.addEventListener('click', (event) => {
  event.target.style.color = getColor(++textState3);
});

console.log(sum(5)(2)); // 7
