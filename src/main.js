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
