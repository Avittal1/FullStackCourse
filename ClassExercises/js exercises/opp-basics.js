// ---Constructor Function Exercises – Basic Object Creation---
// Exercise 1 - Phone
function Phone(brand, model) {
  this.brand = brand;
  this.model = model;
}

Phone.prototype.details = function() {
  console.log(`Phone: ${this.brand} ${this.model}`);
};

//run
const myPhone = new Phone("Samsung", "S22");
myPhone.details();

// Exercise 2 - Rectangle
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.area = function() {
  return this.width * this.height;
};

//run
const myRectangle = new Rectangle(5, 3);
console.log(`Rectangle area: ${myRectangle.area()}`);

// Exercise 3 - BankAccount
function BankAccount(owner, balance) {
  this.owner = owner;
  this.balance = balance;
}

BankAccount.prototype.deposit = function(amount) {
  this.balance += amount;
};

BankAccount.prototype.withdraw = function(amount) {
  this.balance -= amount;
};

BankAccount.prototype.checkBalance = function(){
    console.log(`Bank account balance: ${this.balance}`);
}

//run
const myAccount = new BankAccount("Alice", 100);
myAccount.deposit(50);
myAccount.withdraw(25);
myAccount.checkBalance();

// ---🟡 Constructor Inheritance Exercises (Without ES6 Classes)---
// Exercise 4 - Animal & Dog
function Animal(name) { this.name = name; }

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name) { Animal.call(this, name); }

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

//run
const dog = new Dog("Rocky");
dog.speak();
dog.bark();

// Exercise 5 - Vehicle & Car
function Vehicle(type){ this.type = type; }

Vehicle.prototype.describe = function() {
  console.log(`This is a ${this.type}`);
}

function Car(brand, type = "car"){
  Vehicle.call(this, type);
  this.brand = brand;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.info = function() {
  console.log(`This is a ${this.brand} ${this.type}`);
};

//run
const car = new Car("BMW");
car.describe();
car.info();

// Exercise 6 - Shape Polymorphism
function Shape() {}
Shape.prototype.area = function() { return 0; };

function Circle(radius) { this.radius = radius; }
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.area = function() {
  return Math.PI * Math.pow(this.radius, 2);
};

function Square(side) { this.side = side; }
Square.prototype = Object.create(Shape.prototype);
Square.prototype.constructor = Square;
Square.prototype.area = function() {
  return Math.pow(this.side, 2);
};

// run
const circle = new Circle(3);
console.log(circle.area());

const square = new Square(4);
console.log(square.area());

// ---ES6 Class Exercises (With Inheritance, Polymorphism, Private Fields)---
// Exercise 7 - Book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  info() {
    console.log(`${this.title} by ${this.author}`);
  }
}

//run
const myBook = new Book("The Hobbit", "Tolkien");
myBook.info();

// Exercise 8 - Person & Student
class Person {
  constructor(name) { this.name = name; }

  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

class Student extends Person {
  constructor(name, school) {
    super(name);
    this.school = school;
  }

  study() {
    console.log(`${this.name} is studying at ${this.school}`);
  }
}

//run
const student = new Student("Alice", "Oxford");
student.greet();
student.study();

// Exercise 9 - Employee & Manager (Polymorphism + Private Fields)
class Employee {
  #salary;

  constructor(salary) { this.#salary = salary; }

  getSalary() { return this.#salary; }

  work() {
    console.log("Employee is working");
  }
}

class Manager extends Employee {
  work() {
    console.log("Manager is managing");
  }
}

//run
const emp = new Employee(4000);
console.log(emp.getSalary());
emp.work();

const mgr = new Manager(5000);
console.log(mgr.getSalary());
mgr.work();