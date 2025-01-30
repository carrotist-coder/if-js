import { randNumber } from '@ngneat/falso';
import { colors, getColor, sum } from '../src/functions';

test('sum(a)(b) must be equal to a + b', () => {
  const num1 = randNumber();
  const num2 = randNumber();
  expect(sum(num1)(num2)).toBe(num1 + num2);
});

test('sum(5)(4) must be equal to 9', () => {
  expect(sum(5)(4)).toBe(9);
});

test('funcs returns correct color based on index', () => {
  expect(getColor(0)).toBe('magenta');
  expect(getColor(1)).toBe('cyan');
  expect(getColor(2)).toBe('firebrick');
  expect(getColor(3)).toBe('springgreen');
  expect(getColor(4)).toBe('skyblue');
  const randColor = randNumber() % colors.length;
  expect(getColor(randColor)).toBe(colors[randColor]);
});
