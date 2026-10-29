//1️⃣ Odd Index Sum
function OddIndexSum(numArr) {
	return numArr.reduce((sum, number, index) => {
		return index % 2 === 1 ? sum + number : sum;
	}, 0);
}

//2️⃣ Max Minus Min
function MaxMinusMin(numArr) {
	return Math.max(...numArr) - Math.min(...numArr);
}

//3️⃣ Capitalize First Letter of Each Word
function Capitalize(str) {
	return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

//4️⃣ Count Object Keys with Values Above X
function CountValuesAboveX(obj, x) {
	return Object.values(obj).filter((value) => value > x).length;
}

//5️⃣ Reverse Array Without Using .reverse()
function ReverseArray(arr) {
	const reversed = [];
	for (let index = arr.length - 1; index >= 0; index--) {
		reversed.push(arr[index]);
	}
	return reversed;
}

// 6️⃣ Student Pass/Fail Counter (OOP)
class Student {
	constructor(name, grade) {
		this.name = name;
		this.grade = grade;
	}
}

function CountPassedStudents(students) {
	return students.filter((student) => student.grade >= 60).length;
}

//7️⃣ Product of All Except Current
function ProductOfAllExceptCurrent(arr) {
	return arr.map((_, currentIndex) => {
		let product = 1;
		for (let index = 0; index < arr.length; index++) {
			if (index !== currentIndex) {
				product *= arr[index];
			}
		}
		return product;
	});
}

// 8️⃣ Find Longest Word
function LongestWord(str){
	return str.split(/\s+/).reduce((longest, word) => {
		return word.length > longest.length ? word : longest;
	}, "");
}

//9️⃣ Object Inversion
function ObjectInversion(obj) {
	return Object.fromEntries(
		Object.entries(obj).map(([key, value]) => [value, key])
	);
}

// 🔟 Simple Bank Account (OOP)
class BankAccount {
	constructor(balance = 0) {
		this.balance = balance;
	}

	deposit(amount) {
		this.balance += amount;
		return this.balance;
	}

	withdraw(amount) {
		if (amount > this.balance) {
			throw new Error("Insufficient funds");
		}
		this.balance -= amount;
		return this.balance;
	}
}

console.log("--- בדיקות ---");

// 1️⃣ OddIndexSum
console.assert(OddIndexSum([10, 20, 30, 40, 50]) === 60, "Test 1 Failed: OddIndexSum");

// 2️⃣ MaxMinusMin
console.assert(MaxMinusMin([7, 2, 10, 4]) === 8, "Test 2 Failed: MaxMinusMin");

// 3️⃣ Capitalize
console.assert(Capitalize("hello world test") === "Hello World Test", "Test 3 Failed: Capitalize");

// 4️⃣ CountValuesAboveX
console.assert(CountValuesAboveX({ a: 5, b: 12, c: 8 }, 7) === 2, "Test 4 Failed: CountValuesAboveX");

// 5️⃣ ReverseArray
const originalArr = [1, 2, 3, 4];
const reversed = ReverseArray(originalArr);
console.assert(JSON.stringify(reversed) === JSON.stringify([4, 3, 2, 1]), "Test 5 Failed: ReverseArray");

// 6️⃣ Student Pass/Fail Counter (OOP)
const studentsList = [new Student("A", 75), new Student("B", 50), new Student("C", 60)];
console.assert(CountPassedStudents(studentsList) === 2, "Test 6 Failed: CountPassedStudents");

// 7️⃣ Product of All Except Current
const prodResult = ProductOfAllExceptCurrent([2, 3, 4]);
console.assert(JSON.stringify(prodResult) === JSON.stringify([12, 8, 6]), "Test 7 Failed: ProductOfAllExceptCurrent");

// 8️⃣ Find Longest Word
console.assert(LongestWord("Find the longest word here") === "longest", "Test 8 Failed: LongestWord");

// 9️⃣ Object Inversion
const inverted = ObjectInversion({ a: "one", b: "two" });
console.assert(inverted.one === "a" && inverted.two === "b", "Test 9 Failed: ObjectInversion");

// 🔟 Simple Bank Account (OOP)
const myAccount = new BankAccount(100);
myAccount.deposit(50);
console.assert(myAccount.balance === 150, "Test 10 Deposit Failed");

myAccount.withdraw(40);
console.assert(myAccount.balance === 110, "Test 10 Withdraw Failed");

// בדיקה שמשיכת יתר זורקת שגיאה כמצופה
let errorThrown = false;
try {
    myAccount.withdraw(1000);
} catch (e) {
    errorThrown = true;
}
console.assert(errorThrown === true, "Test 10 Insufficient Funds Error Failed");

console.log("--- הבדיקות עברו בהצלחה! 🎉 ---");