const fs = require('fs');
const https = require('https');

// ==========================================
// Exercises 1-7: Basic Promises
// ==========================================

// Exercise 1: Say Hello After a Delay
function delayedGreet(name, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Hello, ${name}!`);
        }, delay);
    });
}

// Exercise 2: Read a File with Promise
function readFileContent(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Exercise 3: Random Success or Failure
function randomOperation() {
    return new Promise((resolve, reject) => {
        const isSuccess = Math.random() < 0.5;
        if (isSuccess) {
            resolve("Success!");
        } else {
            reject("Failure!");
        }
    });
}

// Exercise 4: Timer Race - Which is Faster?
function raceTimers() {
    const timerA = new Promise((resolve) => {
        setTimeout(() => resolve("Timer A finished!"), 2000);
    });

    const timerB = new Promise((resolve) => {
        setTimeout(() => resolve("Timer B finished!"), 3000);
    });

    return Promise.race([timerA, timerB]);
}

// Exercise 5: Get Data from Website
function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Exercise 6: Wait for 3 Promises Together
function waitAll() {
    const p1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));
    const p2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 2000));
    const p3 = new Promise((resolve) => setTimeout(() => resolve("Third"), 3000));

    return Promise.all([p1, p2, p3]);
}

// Exercise 7: Check if File Exists
function checkFileExists(path) {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
}


// ==========================================
// Exercises 8-10: Chaining Promises
// ==========================================

// Helper function to wait for a specified time
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Exercise 8: Say 3 Things, One by One
function chainedGreetings() {
    return wait(1000)
        .then(() => {
            console.log("Hi!");
            return wait(2000);
        })
        .then(() => {
            console.log("How are you?");
            return wait(1000);
        })
        .then(() => {
            console.log("Goodbye!");
        });
}

// Exercise 9: Read File -> Count Words -> Save Result
function processFile(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        fs.readFile(inputPath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    })
    .then((content) => {
        const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
        const resultString = `Word count: ${wordCount}`;
        
        return new Promise((resolve, reject) => {
            fs.writeFile(outputPath, resultString, (err) => {
                if (err) reject(err);
                else resolve(resultString);
            });
        });
    });
}

// Exercise 10: Get Data -> Parse JSON -> Show Title
function getUserTitle(userId) {
    const url = `https://jsonplaceholder.typicode.com/todos/${userId}`;
    
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', err => reject(err));
    })
    .then((rawdata) => {
        return JSON.parse(rawdata);
    })
    .then((json) => {
        console.log(`User ${userId}'s title: ${json.title}`);
    });
}


// ==========================================
// הדגמת הפעלת התרגילים
// ==========================================

// Ex 1:
delayedGreet("Alice", 2000).then(msg => console.log(msg));

// Ex 2:
readFileContent('file.txt')
    .then(content => {
        console.log("Content of file.txt:");
        console.log(content);
    })
    .catch(err => console.error("Error reading file:", err.message));

// Ex 3:
randomOperation().then(res => console.log(res)).catch(err => console.log(err));

// Ex 4:
raceTimers().then(fastest => console.log(fastest));

// Ex 5:
const targetUrl = "https://jsonplaceholder.typicode.com/todos/1";
fetchData(targetUrl)
    .then(response => {
        console.log(`Received data from ${targetUrl}:`);
        console.log(response);
    })
    .catch(err => console.error(err));

// Ex 6:
waitAll().then(results => console.log(results));

// Ex 7:
checkFileExists('file.txt')
    .then(exists => console.log(`File exists: ${exists}`))
    .catch(notExists => console.log(`File exists: ${notExists}`));

// Ex 8:
chainedGreetings();

// Ex 9:
processFile('file.txt', 'result.txt')
    .then(res => {
        console.log("Word count written to result.txt:");
        console.log(res);
    })
    .catch(err => console.error("Error:", err));

// Ex 10:
getUserTitle(4)
    .catch(err => console.error("An error occurred:", err));