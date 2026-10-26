// 1. Sum All Digits of a 5-Digit Number
let num = 58423;
let sum = 0;

let originalNum = num;

while (num > 0) {
  sum += num % 10;
  num = Math.floor(num / 10);
}

console.log("1. Sum All Digits of a 5-Digit Number:");
console.log(`Input: ${originalNum}`);
console.log(`Output: The sum is ${sum}`);

// 2. Build a Right-Angled Triangle Using *
let rows = 5;
console.log("\n2. Build a Right-Angled Triangle Using *:");
for (let i = 1; i <= rows; i++) {
  console.log("*".repeat(i));
}

// 3. Find the Largest of 5 Numbers (No Arrays)
let a = 12, b = 45, c = 7, d = 89, e = 34;
let largest = a;

if (b > largest) {
  largest = b;
}
if (c > largest) {
  largest = c;
}
if (d > largest) {
  largest = d;
}
if (e > largest) {
  largest = e;
}

console.log("\n3. Find the Largest of 5 Numbers (No Arrays):");
console.log(`Input: ${a}, ${b}, ${c}, ${d}, ${e}`);
console.log(`Output: The largest number is ${largest}`);

// 4. Count the Digits in a Number
let number = 1234567890;
let digitCount = 0;
let tempNum = number;

while (tempNum > 0) {
  digitCount++;
  tempNum = Math.floor(tempNum / 10);
}

console.log("\n4. Count the Digits in a Number:");
console.log(`Input: ${number}`);
console.log(`Output: The number of digits is ${digitCount}`);

// 5. Print All Even Numbers Between Two Given Values
let start = 10;
let end = 30;

console.log("\n5. Print All Even Numbers Between Two Given Values:");
for (let i = start; i <= end; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// 6. Reverse a 4-Digit Number
let fourDigitNum = 1234;
let reversedNum = 0;
let tempFourDigitNum = fourDigitNum;

while (tempFourDigitNum > 0) {
  reversedNum = reversedNum * 10 + tempFourDigitNum % 10;
  tempFourDigitNum = Math.floor(tempFourDigitNum / 10);
}

console.log("\n6. Reverse a 4-Digit Number:");
console.log(`Input: ${fourDigitNum}`);
console.log(`Output: The reversed number is ${reversedNum}`);

// 7. Print a Number Pyramid (Static Depth 5)
let pyramidRows = 5;
console.log("\n7. Print a Number Pyramid (Static Depth 5):");
for (let i = 1; i <= pyramidRows; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += j;
  }
  console.log(row);
}

// 8. Detect if a Number Is a Palindrome
let palindromeNum = 12321;
let reversedPalindromeNum = 0;
let tempPalindromeNum = palindromeNum;

while (tempPalindromeNum > 0) {
  reversedPalindromeNum = reversedPalindromeNum * 10 + tempPalindromeNum % 10;
  tempPalindromeNum = Math.floor(tempPalindromeNum / 10);
}

if (palindromeNum === reversedPalindromeNum) {
  console.log("\n8. Detect if a Number Is a Palindrome:");
  console.log(`Input: ${palindromeNum}`);
  console.log(`Output: The number is a palindrome.`);
} else {
  console.log("\n8. Detect if a Number Is a Palindrome:");
  console.log(`Input: ${palindromeNum}`);
  console.log(`Output: The number is not a palindrome.`);
}

// 9. Multiplication Table for a Number
let multiplicationNum = 7;
console.log("\n9. Multiplication Table for a Number:");
console.log(`Input: ${multiplicationNum}`);
for (let i = 1; i <= 10; i++) {
  console.log(`${multiplicationNum} x ${i} = ${multiplicationNum * i}`);
}

// 10. Collatz Sequence (Simplified)
let collatzNum = 6;
console.log("\n10. Collatz Sequence (Simplified):");
console.log(`Input: ${collatzNum}`);
while (collatzNum !== 1) {
  console.log(collatzNum);
  if (collatzNum % 2 === 0) {
    collatzNum = collatzNum / 2;
  } else {
    collatzNum = 3 * collatzNum + 1;
  }
}
console.log(collatzNum);