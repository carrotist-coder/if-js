import {
  convertDate,
  deepEqual,
  getCalendarMonth,
  getColor,
  groupCities,
  palindrome,
  searchHotel,
  sum,
} from './utils/functions.js';
import { obj1, obj2, obj3 } from './consts/hotelsArray.js';
import { Students } from './entities/Student.js';
import { studentsData } from './consts/studentsData.js';

const students = new Students(studentsData);
console.log(students.getInfo());

console.log(deepEqual(obj1, obj2)); // true
console.log(deepEqual(obj1, obj3)); // false

console.log('шалаш: ', palindrome('шалаш')); // true
console.log('яблоко: ', palindrome('яблоко')); // false

console.log(groupCities());
console.log(searchHotel('hotel'));

const daysInMonth = 30;
const daysInWeek = 7;
const dayOfWeek = 4; // Понедельник = 0
console.log(getCalendarMonth(daysInMonth, daysInWeek, dayOfWeek));

const date = '2020-11-26';
console.log(convertDate(date)); // '26.11.2020'

const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const text3 = document.getElementById('text3');

text1.addEventListener('click', (event) => {
  event.target.style.color = getColor();
});

text2.addEventListener('click', (event) => {
  event.target.style.color = getColor();
});

text3.addEventListener('click', (event) => {
  event.target.style.color = getColor();
});

console.log(sum(5)(2)); // 7
