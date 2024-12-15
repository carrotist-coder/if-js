let user = 'John Doe';
console.log(user);
const student = 'Dmitry Carrot';
console.log(student);
user = student;
console.log(user); // expected output: 'Dmitry Carrot'

let test = 1;
test++;
test += '1';
console.log(test); // expected output: '21'
console.log(--test); // expected output: 20
test = !!test;
console.log(test); // expected output: true

let list = [2, 3, 5, 8];
let product = 1;
for (let i = 0; i < list.length; i++) {
  product *= list[i];
}
console.log(product);

list = [2, 5, 8, 15, 0, 6, 20, 3];
console.log('5 < num < 10');
for (let i = 0; i < list.length; i++) {
  if (5 < list[i] && list[i] < 10) {
    console.log(list[i]);
  }
}

console.log('Num index is even:');
for (let i = 0; i < list.length; i++) {
  if (list[i] % 2 === 0) {
    console.log(list[i]);
  }
}
