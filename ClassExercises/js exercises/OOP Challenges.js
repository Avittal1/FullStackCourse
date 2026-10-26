// 1: Digital Library System
class MediaItem {
    constructor(title, year, genre) {
        this.title = title;
        this.year = year;
        this.genre = genre;
    }

    getSummary() {
        return `${this.title} (${this.year}) - ${this.genre}`;
    }
}

class Book extends MediaItem {
    constructor(title, author, year, genre, pageCount) {
        super(title, year, genre);
        this.author = author;
        this.pageCount = pageCount;
    }

    getSummary() {
        return `Book: '${this.title}' by ${this.author}, ${this.pageCount} pages`;
    }
}

class Movie extends MediaItem {
    constructor(title, director, year, genre, durationMinutes) {
        super(title, year, genre);
        this.director = director;
        this.durationMinutes = durationMinutes;
    }

    getSummary() {
        return `Movie: '${this.title}' directed by ${this.director}, ${this.durationMinutes} min`;
    }
}

class Library {
    constructor() { this.items = []; }

    addItem(item) { this.items.push(item); }

    search(term) {
        const lowerTerm = term.toLowerCase();
        return this.items.filter(item => 
            item.title.toLowerCase().includes(lowerTerm)
        );
    }

    listByGenre(genre) {
        return this.items.filter(item => 
            item.genre.toLowerCase() === genre.toLowerCase()
        );
    }
}

//run
const lib = new Library();
lib.addItem(new Book("Dune", "Frank Herbert", 1965, "Sci-Fi", 412));
lib.addItem(new Movie("Dune", "Denis Villeneuve", 2021, "Sci-Fi", 155));

console.log(lib.search("dune").map(item => item.getSummary()));
console.log(lib.listByGenre("Sci-Fi").map(item => item.getSummary()));

// 2: Banking System with Transactions
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount < 0) throw new Error("Deposit amount must be positive.");
        this.balance += amount;
    }

    withdraw(amount) {
        if (amount <= 0) throw new Error("Withdrawal amount must be positive.");
        if (amount > this.balance) {
            throw new Error("Insufficient funds.");
        }
        this.balance -= amount;
    }
}

class Bank {
    constructor() {  this.accounts = []; }

    addAccount(account) {  this.accounts.push(account); }

    findAccount(ownerName) {
        return this.accounts.find(acc => acc.owner.toLowerCase() === ownerName.toLowerCase());
    }

    transfer(fromName, toName, amount) {
        const fromAcc = this.findAccount(fromName);
        const toAcc = this.findAccount(toName);

        if (!fromAcc || !toAcc) {
            console.log("Error: One or both accounts not found.\n");
            return;
        }

        try {
            fromAcc.withdraw(amount);
            toAcc.deposit(amount);
            console.log(`Successfully transferred $${amount} from ${fromName} to ${toName}.\n`);
        } catch (error) {
            console.log(`Transfer failed: ${error.message}\n`);
        }
    }

    showBalances() {
        console.log("\n--- Bank Balances ---");
        this.accounts.forEach(acc => {
            console.log(`Owner: ${acc.owner}, Balance: $${acc.balance}`);
        });
        console.log("---------------------\n");
    }
}

const bank = new Bank();
bank.addAccount(new BankAccount("Alice", 2000));
bank.addAccount(new BankAccount("Bob", 500));

function showMenu() {
    console.log("Choose an option:");
    console.log("1. Create Account");
    console.log("2. Transfer Money");
    console.log("3. Show Balances");
    console.log("4. Exit");

    rl.question("Enter choice (1-4): ", (choice) => {
        switch (choice.trim()) {
            case '1':
                rl.question("Enter owner name: ", (name) => {
                    rl.question("Enter initial balance: ", (balStr) => {
                        const initialBalance = parseFloat(balStr) || 0;
                        bank.addAccount(new BankAccount(name, initialBalance));
                        console.log("Account created successfully!\n");
                        showMenu();
                    });
                });
                break;
            case '2':
                rl.question("Sender name: ", (from) => {
                    rl.question("Receiver name: ", (to) => {
                        rl.question("Amount to transfer: ", (amtStr) => {
                            const amount = parseFloat(amtStr);
                            bank.transfer(from, to, amount);
                            showMenu();
                        });
                    });
                });
                break;
            case '3':
                bank.showBalances();
                showMenu();
                break;
            case '4':
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid option, try again.\n");
                showMenu();
        }
    });
}

// התחלת התפריט
showMenu();

// 3: Zoo Management with Feeding Logic