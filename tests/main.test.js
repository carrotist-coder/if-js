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
    [27, 28, 29, 30, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 1],
  ]);
});

test('deepEqual works correctly', () => {
  expect(deepEqual(obj1, obj2)).toBe(true);
  expect(deepEqual(obj1, obj3)).toBe(false);
  expect(deepEqual(obj2, obj3)).toBe(false);
});
