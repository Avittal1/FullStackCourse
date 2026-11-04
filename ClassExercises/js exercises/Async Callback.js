const fs = require('fs');
const path = require('path');
const os = require('os');

// ==========================================
// Exercise 1: File Reader with Stats
// ==========================================
function readFileWithStats(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    console.log('File Content:');
    console.log(data);

    fs.stat(filePath, (err, stats) => {
      if (err) {
        return callback(err);
      }

      console.log(`Size: ${stats.size} bytes`);
      console.log(`Created At: ${stats.birthtime.toISOString()}`);
      callback(null, { content: data, stats });
    });
  });
}

// ==========================================
// Exercise 2: Directory Files Only
// ==========================================
function listFilesOnly(dirPath, callback) {
  fs.readdir(dirPath, (err, items) => {
    if (err) {
      return callback(err);
    }

    let completed = 0;
    const files = [];

    if (items.length === 0) {
      return callback(null, files);
    }

    items.forEach((item) => {
      const fullPath = path.join(dirPath, item);

      fs.lstat(fullPath, (err, stats) => {
        if (!err && stats.isFile()) {
          console.log(`File: ${item}`);
          files.push(item);
        }

        completed++;
        if (completed === items.length) {
          callback(null, files);
        }
      });
    });
  });
}

// ==========================================
// Exercise 3: Countdown Timer
// ==========================================
function countdown(n, onComplete) {
  if (n < 0) {
    console.log("Time's up!");
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  console.log(n);

  setTimeout(() => {
    countdown(n - 1, onComplete);
  }, 1000);
}

// ==========================================
// Exercise 4: Random Line from File
// ==========================================
function printRandomLine(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');

    if (lines.length === 0) {
      console.log('No lines found in file.');
      return callback(null, null);
    }

    const randomIndex = Math.floor(Math.random() * lines.length);
    const selectedLine = lines[randomIndex];
    console.log(`Random Line: ${selectedLine}`);
    callback(null, selectedLine);
  });
}

// ==========================================
// Exercise 5: System Free Memory Logger
// ==========================================
function logFreeMemory(onComplete) {
  let count = 0;

  const intervalId = setInterval(() => {
    const total = os.totalmem();
    const free = os.freemem();
    const freePercentage = ((free / total) * 100).toFixed(2);

    console.log(`Free Memory: ${freePercentage}%`);

    count++;

    if (count >= 5) {
      clearInterval(intervalId);
      console.log('Memory logging complete.');
      if (typeof onComplete === 'function') onComplete();
    }
  }, 2000);
}


// ==========================================
// Tests / Verification Section
// ==========================================
console.log('=== RUNNING TESTS ===\n');

// יצירת קבצים זמניים לצורך בדיקה אוטומטית
const testFile1 = 'test_file1.txt';
const testQuotes = 'quotes.txt';

fs.writeFileSync(testFile1, 'Hello world, welcome to Node.js!');
fs.writeFileSync(testQuotes, 'Stay positive.\nKeep learning.\nJavaScript is fun!');

console.log('--- Test Exercise 1 ---');
readFileWithStats(testFile1, (err) => {
  if (err) console.error('Ex 1 Error:', err);

  console.log('\n--- Test Exercise 2 ---');
  listFilesOnly('./', (err) => {
    if (err) console.error('Ex 2 Error:', err);

    console.log('\n--- Test Exercise 4 ---');
    printRandomLine(testQuotes, (err) => {
      if (err) console.error('Ex 4 Error:', err);

      console.log('\n--- Test Exercise 3 (Countdown from 3 for quick test) ---');
      countdown(3, () => {

        console.log('\n--- Test Exercise 5 (Runs for 2 logs instead of 5 for quick test) ---');
        // ניתן להריץ את המקור המלא או גרסה מקוצרת לבדיקה מהירה
        logFreeMemory();
        
        // ניקוי קבצי הבדיקה בסיום
        setTimeout(() => {
          try {
            fs.unlinkSync(testFile1);
            fs.unlinkSync(testQuotes);
          } catch (e) {}
        }, 11000);
      });
    });
  });
});