// 1: Variable Swap Without Temp
let a =  "some string";
let b = "another string";

[a, b] = [b, a];
console.log("1. After swapping:a:", a, "b:", b);

// 2: 2D Grid Count in a 5x5 2D array
let grid = [
  ["X", "o", "x", "X", "o"],
  ["o", "X", "o", "o", "x"],
  ["x", "o", "X", "o", "o"],
  ["o", "o", "o", "X", "X"],
  ["x", "X", "o", "o", "o"]
];

let count = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    
    if (grid[i][j] === "X") {
      count++;
      console.log(`Found "X" at row: ${i}, col: ${j}`);
    }
    
  }
}

console.log(`Total "X" count: ${count}`);

// 3: Nested Object Read
let family = { parents: {}, 
children: [ {name: "Ali"}, {name: "Lea"}, {name: "Mona"} ] };

console.log("3. Family members:");
console.log(`Parents: ${JSON.stringify(family.parents)}`);
console.log(`Children: ${family.children.map(child => child.name).join(", ")}`);

// 4: Manual Reverse
let arr = [1, 2, 3, 4, 5];
for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
console.log("4. After manual reverse:", arr);

// 5: Type Collector
let mixedArray = [1, "two", 3, "four", true, null, undefined, {key: "value"}, [1, 2, 3], "ten", 10, false];

let typeCount = {
  number: 0,
  string: 0,
  object: 0,
  boolean: 0,
  nullCount: 0
};

for (let i = 0; i < mixedArray.length; i++) {
  let item = mixedArray[i];

  if (item === null) {
    typeCount.nullCount++;
  } else {
    let t = typeof item;
    if (typeCount[t] !== undefined) {
      typeCount[t]++;
    }
  }
}

console.log("5. Type collector count:", typeCount);

// 6: Filter Without .filter()
let numbers = [50, 150, 200, 75, 300, 120];
let filteredNumbers = [];
let comparisonCount = 0;

for (let i = 0; i < numbers.length; i++) {
  comparisonCount++;
  if (numbers[i] > 100) {
    filteredNumbers.push(numbers[i]);
  }
}

console.log("6. Filtered numbers:", filteredNumbers);
console.log("Comparison count:", comparisonCount);

// 7: Conditional Object Filler
//Section 7: Conditional Object Filler. Goal: Create an object with keys "even" and "odd", and push numbers 1–50 into the correct array. Twist: Count how many are divisible by both 2 and 3.
let conditionalObject = { even: [], odd: [] };
let divisibleByBoth = 0;

for (let i = 1; i <= 50; i++) {
  if (i % 2 === 0) {
    conditionalObject.even.push(i);
  } else {
    conditionalObject.odd.push(i);
  }

  if (i % 2 === 0 && i % 3 === 0) {
    divisibleByBoth++;
  }
}

console.log("7. Conditional object:", conditionalObject);
console.log("Numbers divisible by both 2 and 3:", divisibleByBoth);

//  8: Grid Checker
let gridChecker = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

for (let i = 0; i < gridChecker.length; i++) {
  for (let j = 0; j < gridChecker[i].length; j++) {
    if (i === j || i + j === gridChecker.length - 1) {
      gridChecker[i][j] = "#";
    }
  }
}

console.log("8. Grid checker:", gridChecker);

// 9: Frequency Counter
// Section 9: Frequency Counter. Goal: Given a string, count how many times each letter appears using an object.
// Twist: Ignore spaces and punctuation, and make it case-insensitive.
let frequencyCounter = {};
let testString = "Hello, World!";

for (let i = 0; i < testString.length; i++) {
  let char = testString[i].toLowerCase();
  if (char >= 'a' && char <= 'z') {
    frequencyCounter[char] = (frequencyCounter[char] || 0) + 1;
  }
}

console.log("9. Frequency counter:", frequencyCounter);

// 10: Flattening Matrix
let matrix = [
  [1, -2, 3],
  [-4, 5, -6],
  [7, 8, -9]
];
let flattened = [];

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] >= 0) {
      flattened.push(matrix[i][j]);
    }
  }
}

console.log("10. Flattened matrix:", flattened);

// 11: Object Key Transformer
let originalObject = { name: "John", age: 30, city: "New York" };
let transformedObject = {};

for (let key in originalObject) {
  let newKey = key.toUpperCase();
  transformedObject[newKey] = originalObject[key];
}

let sortedKeys = Object.keys(transformedObject).sort();
let sortedObject = {};

for (let key of sortedKeys) {
  sortedObject[key] = transformedObject[key];
}

console.log("11. Transformed object:", sortedObject);

// 12: Triangular Loop Output
let size = 5;
let symbol = "*";
let triangleOutput = "";

for (let i = 1; i <= size; i++) {
  triangleOutput += symbol.repeat(i) + "\n";
}
console.log("12. Triangular output:\n", triangleOutput);

// 13: Match Two Arrays
let arrayA = [1, 2, 3, 4, 5, 5];
let arrayB = [4, 5, 6, 7, 8, 5];
let matches = new Set();
for(let i = 0; i < arrayA.length; i++){
  for(let j = 0; j < arrayB.length; j++){
    if(arrayA[i]===arrayB[j]){
      matches.add(arrayA[i]);
    }
  }
}

console.log("13. Match Two Arrays:", matches);

// 14: Key-Value Reverser
let keyValueObject = { name: "John", age: 30, active: true };
let reversedObject = {};

for (let key in keyValueObject) {
  let value = keyValueObject[key];
  if (typeof value === "string" || typeof value === "number") {
    reversedObject[value] = key;
  }
}

console.log("14. Reversed object:", reversedObject);

// 15: Identity Grid
let identityGrid = [];

for (let i = 0; i < 5; i++) {
  let row = [];
  for (let j = 0; j < 5; j++) {
    row.push(i === 2 ? 9 : i === j ? 1 : 0);
  }
  identityGrid.push(row);
}

console.log("15. Identity grid:", identityGrid);

// 16: Object Conditions
let users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: false },
  { name: "Charlie", age: 30, active: false },
  { name: "Diana", age: 16, active: true }
];
let inactiveUnder18Count = 0;

console.log("16. Active users over 18:");
for (let user of users) {
  if (user.active && user.age > 18) {
    console.log(user);
  }

  if (!user.active && user.age < 18) {
    inactiveUnder18Count++;
  }
}

console.log("Inactive users under 18:", inactiveUnder18Count);

// 17: Manual Min/Max
let minMaxNumbers = [12, 5, 8, 20, 3];
let min = minMaxNumbers[0];
let max = minMaxNumbers[0];

for (let number of minMaxNumbers) {
  if (number < min) {
    min = number;
  }
  if (number > max) {
    max = number;
  }
}

console.log("Minimum:", min);
console.log("Maximum:", max);

// 18: Rotating Array
let rotatingArray = [1, 2, 3];

for (let i = 0; i < 3; i++) {
  rotatingArray.push(rotatingArray.shift());
}

console.log("Rotated array:", rotatingArray);

// 19: Manual JSON Print
let person = { name: "Ali", age: 25 };
let manualJson = `{ "name": "${person.name}", "age": ${person.age} }`;

console.log("Manual JSON:", manualJson);

// 20: Complex Board Validator
let board = [
  ["O", "X", "", ""],
  ["", "O", "X", ""],
  ["X", "", "O", ""],
  ["", "X", "", "O"],
];

let violatesRule = false;

for (let row = 0; row < 4; row++) {
  let rowOs = 0;
  let columnOs = 0;

  for (let column = 0; column < 4; column++) {
    if (board[row][column] === "O") rowOs++;
    if (board[column][row] === "O") columnOs++;
  }

  if (rowOs > 2 || columnOs > 2) {
    violatesRule = true;
    break;
  }
}

if (violatesRule) {
  console.log("Board violates the rule.");
} else {
  console.log("Board is valid.");
}