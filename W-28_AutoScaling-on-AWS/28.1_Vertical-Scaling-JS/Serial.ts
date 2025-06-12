let number = 1_000_000_000_0;

let sum = 0;

const startTime = Date.now();

  for (let i = 0; i < number; i++) {
    sum += i;
  }

const endTime = Date.now();

console.log(`Sum is ${sum}`);
console.log(`Time taken: ${endTime - startTime} ms`);
