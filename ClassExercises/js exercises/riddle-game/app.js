import readline from 'readline-sync';
import fs from 'fs';

import { Riddle } from './classes/Riddle.js';
import { Player } from './classes/Player.js';
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js';
const dbPath = './riddles/db.txt';

function loadRiddlesDB() {
    if (!fs.existsSync(dbPath)) return [];
    const data = fs.readFileSync(dbPath, 'utf8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveRiddlesDB(riddles) {
    fs.writeFileSync(dbPath, JSON.stringify(riddles, null, 2));
}

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function mainMenu() {
    while (true) {
        console.log("\n=== RIDDLE GAME MENU ===");
        console.log("1. Play the game");
        console.log("2. Create a new riddle");
        console.log("3. Read all riddles");
        console.log("4. Update an existing riddle");
        console.log("5. Delete a riddle");
        console.log("6. View leaderboard");
        console.log("7. Exit");

        const choice = readline.question("What do you want to do? (1-7): ");

        switch (choice) {
            case '1':
                playGame();
                break;
            case '2':
                createRiddle();
                break;
            case '3':
                readRiddles();
                break;
            case '4':
                updateRiddle();
                break;
            case '5':
                deleteRiddle();
                break;
            case '6':
                Player.showLeaderboard();
                break;
            case '7':
                console.log("Goodbye!");
                process.exit(0);
            default:
                console.log("Invalid choice, please try again.");
        }
    }
}

function playGame() {
    const riddlesData = loadRiddlesDB();
    if (riddlesData.length === 0) {
        console.log("No riddles found in database! Please create some first.");
        return;
    }

    const playerName = readline.question("What is your name? ");
    Player.handlePlayerLogin(playerName);

    const level = readline.question("Choose difficulty (easy / medium / hard): ");
    const filteredRiddles = riddlesData.filter(r => r.difficulty?.toLowerCase() === level.toLowerCase());

    const riddlesToPlay = filteredRiddles.length > 0 ? shuffleArray(filteredRiddles) : shuffleArray(riddlesData);
    if (filteredRiddles.length === 0) {
        console.log("No exact match for this difficulty. Playing all riddles instead!");
    }

    let totalGameTime = 0;

    for (const riddleData of riddlesToPlay) {
        const riddle = riddleData.choices 
            ? new MultipleChoiceRiddle(riddleData) 
            : new Riddle(riddleData);

        const startTime = Date.now();
        riddle.ask();
        const endTime = Date.now();

        let durationInSeconds = Math.floor((endTime - startTime) / 1000);

        if (riddle.timeLimit && durationInSeconds > riddle.timeLimit) {
            console.log("⏱ Too slow! 5 seconds penalty applied.");
            durationInSeconds += 5;
        }

        if (riddle.usedHint) {
            console.log("💡 Hint used! 10 seconds penalty applied.");
            durationInSeconds += 10;
        }

        totalGameTime += durationInSeconds;
    }

    Player.updatePlayerScore(playerName, totalGameTime);
}

function createRiddle() {
    console.log("\n--- Create New Riddle ---");
    const name = readline.question("Enter riddle name: ");
    const taskDescription = readline.question("Enter description: ");
    const correctAnswer = readline.question("Enter correct answer: ");
    const difficulty = readline.question("Enter difficulty (easy/medium/hard): ") || "medium";
    const timeLimitInput = readline.question("Enter time limit in seconds (optional): ");
    const hint = readline.question("Enter a hint (optional): ");

    const riddles = loadRiddlesDB();
    const newId = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) + 1 : 1;

    const newRiddle = {
        id: newId,
        name,
        taskDescription,
        correctAnswer,
        difficulty,
        timeLimit: timeLimitInput ? parseInt(timeLimitInput) : 20,
        hint: hint || undefined
    };

    riddles.push(newRiddle);
    saveRiddlesDB(riddles);
    console.log("✔ New riddle successfully saved to db.txt!");
}

function readRiddles() {
    const riddles = loadRiddlesDB();
    if (riddles.length === 0) {
        console.log("No riddles in database.");
        return;
    }

    console.log("\n--- All Riddles ---");
    riddles.forEach(r => {
        console.log(`ID: ${r.id} | Name: ${r.name} | Desc: ${r.taskDescription} | Answer: ${r.correctAnswer}`);
    });
}

function updateRiddle() {
    const riddles = loadRiddlesDB();
    if (riddles.length === 0) {
        console.log("No riddles to update.");
        return;
    }

    readRiddles();
    const idInput = readline.question("Enter the ID of the riddle you want to update: ");
    const id = parseInt(idInput);

    const riddleIndex = riddles.findIndex(r => r.id === id);
    if (riddleIndex === -1) {
        console.log("Riddle with this ID not found.");
        return;
    }

    console.log(`Updating riddle: ${riddles[riddleIndex].name}`);
    const newName = readline.question(`New name (leave blank to keep current): `);
    const newDesc = readline.question(`New description (leave blank to keep current): `);
    const newAns = readline.question(`New correct answer (leave blank to keep current): `);

    if (newName) riddles[riddleIndex].name = newName;
    if (newDesc) riddles[riddleIndex].taskDescription = newDesc;
    if (newAns) riddles[riddleIndex].correctAnswer = newAns;

    saveRiddlesDB(riddles);
    console.log("✔ Riddle updated successfully!");
}

function deleteRiddle() {
    const riddles = loadRiddlesDB();
    if (riddles.length === 0) {
        console.log("No riddles to delete.");
        return;
    }

    readRiddles();
    const idInput = readline.question("Enter the ID of the riddle you want to delete: ");
    const id = parseInt(idInput);

    const filteredRiddles = riddles.filter(r => r.id !== id);

    if (filteredRiddles.length === riddles.length) {
        console.log("Riddle ID not found.");
        return;
    }

    saveRiddlesDB(filteredRiddles);
    console.log("✔ Riddle deleted successfully!");
}
mainMenu();