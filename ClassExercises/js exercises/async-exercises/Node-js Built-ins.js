const fs = require('fs');
const path = require('path');
const os = require('os');

// ==========================================
// Exercise 6: Append to File
// ==========================================
function exercise6() {
    const filePath = 'log.txt';
    const logLine = `${new Date().toISOString()} - Log entry\n`;

    fs.appendFile(filePath, logLine, (err) => {
        if (err) {
            console.error('Ex 6 Error:', err);
            return;
        }
        console.log('Ex 6: Log entry added successfully.');
    });
}

// ==========================================
// Exercise 7: Create a New Folder
// ==========================================
function exercise7() {
    const folderPath = path.join(__dirname, 'backup');

    fs.access(folderPath, fs.constants.F_OK, (err) => {
        if (!err) {
            console.log('Ex 7: Folder already exists.');
        } else {
            fs.mkdir(folderPath, (err) => {
                if (err) {
                    console.error('Ex 7 Error:', err);
                    return;
                }
                console.log('Ex 7: Folder created successfully.');
            });
        }
    });
}

// ==========================================
// Exercise 8: Delete a File Safely
// ==========================================
function exercise8() {
    const filePath = 'temp.txt';

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('Ex 8: File not found.');
        } else {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Ex 8 Error:', err);
                    return;
                }
                console.log('Ex 8: File deleted.');
            });
        }
    });
}

// ==========================================
// Exercise 9: CPU Model Info
// ==========================================
function exercise9(callback) {
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index}: ${cpu.model}`);
    });
    if (callback) callback();
}

// ==========================================
// Exercise 10: Delay Message Chain
// ==========================================
function exercise10() {
    setTimeout(() => {
        console.log('Message 1');
        setTimeout(() => {
            console.log('Message 2');
            setTimeout(() => {
                console.log('Message 3');
            }, 1000);
        }, 1000);
    }, 1000);
}

// ==========================================
// Exercise 11: Sum File Sizes in Folder
// ==========================================
function exercise11() {
    const dirPath = './';

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error('Ex 11 Error:', err);
            return;
        }

        let totalSize = 0;
        let pendingFiles = files.length;

        if (pendingFiles === 0) {
            console.log('Total size: 0 bytes');
            return;
        }

        files.forEach((file) => {
            const fullPath = path.join(dirPath, file);
            fs.lstat(fullPath, (err, stats) => {
                if (!err && stats.isFile()) {
                    totalSize += stats.size;
                }
                pendingFiles--;
                if (pendingFiles === 0) {
                    console.log(`Ex 11 Total size: ${totalSize} bytes`);
                }
            });
        });
    });
}

// ==========================================
// Exercise 12: Check File Extension
// ==========================================
function exercise12() {
    const filePath = 'notes.txt';

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('Ex 12: File not found.');
        } else {
            const ext = path.extname(filePath);
            const baseName = path.basename(filePath);
            if (ext === '.txt') {
                console.log(`Ex 12: ${baseName} is a .txt file.`);
            } else {
                console.log(`Ex 12: ${baseName} is not a .txt file (Extension: ${ext}).`);
            }
        }
    });
}

// ==========================================
// Exercise 13: Show System Uptime
// ==========================================
function exercise13(callback) {
    const uptime = os.uptime();
    console.log(`System uptime: ${Math.floor(uptime)} seconds`);
    if (callback) callback();
}

// ==========================================
// Exercise 14: Countdown with Random Delay
// ==========================================
function exercise14(count = 3) {
    console.log(count);
    if (count > 0) {
        const delay = 500 + Math.random() * 1000;
        setTimeout(() => {
            exercise14(count - 1);
        }, delay);
    } else {
        console.log('Done!');
    }
}

// ==========================================
// Exercise 15: Create and Write File
// ==========================================
function exercise15() {
    const filePath = 'data.txt';
    const content = 'Hello Node.js';

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (!err) {
            console.log('Ex 15: File already exists.');
        } else {
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error('Ex 15 Error:', err);
                    return;
                }
                console.log('Ex 15: File created successfully.');
            });
        }
    });
}

// ==========================================
// run all exercises
// ==========================================
function runAllExercises() {
    exercise6();
    exercise7();
    exercise8();
    exercise9(() => {
        exercise10();
        exercise11();
        exercise12();
        exercise13(() => {
            exercise14();
            exercise15();
        });
    });
}

runAllExercises();