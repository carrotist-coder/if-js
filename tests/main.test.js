import { randNumber } from '@ngneat/falso';
import {
  colors,
  convertDate,
  deepEqual,
  getCalendarMonth,
  getColor,
  groupCities,
  palindrome,
  searchHotel,
  sum,
} from '../src/utils/functions';
import { obj1, obj2, obj3 } from '../src/consts/hotelsArray.js';
import { Student, Students } from '../src/entities/Student';
import { studentsData } from '../src/consts/studentsData';
import User from '../src/entities/User';

test('sum(a)(b) must be equal to a + b', () => {
  const num1 = randNumber();
  const num2 = randNumber();
  expect(sum(num1)(num2)).toBe(num1 + num2);
});

test('sum(5)(4) must be equal to 9', () => {
  expect(sum(5)(4)).toBe(9);
});

test('getColor returns correct color based on index', () => {
  expect(getColor(0)).toBe('magenta');
  expect(getColor(1)).toBe('cyan');
  expect(getColor(2)).toBe('firebrick');
  expect(getColor(3)).toBe('springgreen');
  expect(getColor(4)).toBe('skyblue');
  const randColor = randNumber() % colors.length;
  expect(getColor(randColor)).toBe(colors[randColor]);
});

test('convertDate returns correct date', () => {
  expect(convertDate('2020-11-26')).toBe('26.11.2020');
  expect(convertDate('2024-02-22')).toBe('22.02.2024');
  expect(convertDate('1998-1-2')).toBe('02.01.1998');
  expect(convertDate('2003-11-5')).toBe('05.11.2003');
  expect(convertDate('1493-9-30')).toBe('30.09.1493');
});

test('searchHotel returns correct hotel data', () => {
  expect(searchHotel('hotel')).toEqual([
    'Russia, Saint Petersburg, Hotel Leopold',
    'Marocco, Ourika, Rokoko Hotel',
    'Germany, Berlin, Hotel Rehberge Berlin Mitte',
  ]);
  expect(searchHotel('a')).toEqual([
    'Russia, Saint Petersburg, Hotel Leopold',
    'Spain, Santa Cruz de Tenerife, Apartment Sunshine',
    'Slowakia, Vysokie Tatry, Villa Kunerad',
    'Germany, Berlin, Hostel Friendship',
    'Indonesia, Bali, Ubud Bali Resort&SPA',
    'Netherlands, Rotterdam, King Kong Hostel',
    'Marocco, Ourika, Rokoko Hotel',
    'Germany, Berlin, Hotel Rehberge Berlin Mitte',
  ]);
  expect(searchHotel('Scotland')).toEqual([]);
});

test('palindrome works correctly', () => {
  expect(palindrome('шалаш')).toBe(true);
  expect(palindrome('яблоко')).toBe(false);
  expect(palindrome('арозаупаланалапуазора')).toBe(true);
  expect(palindrome(')(()')).toBe(true);
  expect(palindrome('микроскоп')).toBe(false);
});

test('groupCities returns correct object', () => {
  expect(groupCities()).toEqual({
    Germany: ['Berlin'],
    Indonesia: ['Bali'],
    Marocco: ['Ourika'],
    Netherlands: ['Rotterdam'],
    Russia: ['Saint Petersburg'],
    Slowakia: ['Vysokie Tatry'],
    Spain: ['Santa Cruz de Tenerife'],
  });
});

test('getCalendarMonth returns correct month', () => {
  expect(getCalendarMonth(30, 7, 4)).toEqual([
    [
      { dayOfMonth: 27, notCurrentMonth: true, selectedDay: false },
      { dayOfMonth: 28, notCurrentMonth: true, selectedDay: false },
      { dayOfMonth: 29, notCurrentMonth: true, selectedDay: false },
      { dayOfMonth: 30, notCurrentMonth: true, selectedDay: false },
      { dayOfMonth: 1, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 2, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 3, notCurrentMonth: false, selectedDay: false },
    ],
    [
      { dayOfMonth: 4, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 5, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 6, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 7, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 8, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 9, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 10, notCurrentMonth: false, selectedDay: false },
    ],
    [
      { dayOfMonth: 11, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 12, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 13, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 14, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 15, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 16, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 17, notCurrentMonth: false, selectedDay: false },
    ],
    [
      { dayOfMonth: 18, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 19, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 20, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 21, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 22, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 23, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 24, notCurrentMonth: false, selectedDay: false },
    ],
    [
      { dayOfMonth: 25, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 26, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 27, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 28, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 29, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 30, notCurrentMonth: false, selectedDay: false },
      { dayOfMonth: 1, notCurrentMonth: true, selectedDay: false },
    ],
  ]);
});

test('deepEqual works correctly', () => {
  expect(deepEqual(obj1, obj2)).toBe(true);
  expect(deepEqual(obj1, obj3)).toBe(false);
  expect(deepEqual(obj2, obj3)).toBe(false);
});

test('User, Student, Students classes methods work correctly', () => {
  const user = new User('Dmitry', 'Carrot');
  expect(user.fullName).toEqual('Dmitry Carrot');
  const student = new Student({
    admissionYear: 2019,
    courseName: 'JavaScript',
    firstName: 'Dmitry',
    lastName: 'Carrot',
  });
  expect(student.fullName).toEqual('Dmitry Carrot');
  expect(student.course).toEqual(1);
  const students = new Students(studentsData);
  expect(students.getInfo()).toEqual([
    'Василий Петров - Java, 1 курс',
    'Николай Петров - Android, 1 курс',
    'Иван Иванов - JavaScript, 2 курс',
    'Александр Федоров - Python, 3 курс',
  ]);
});
