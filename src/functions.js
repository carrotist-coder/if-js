export const convertDate = (date) => {
  const re = /(\d{4})-(\d{2})-(\d{2})/;
  return date.replace(re, '$3.$2.$1');
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
