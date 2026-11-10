import readline from 'readline-sync';
import { Riddle } from '../classes/Riddle.js';
import MultipleChoiceRiddle from '../classes/MultipleChoiceRiddle.js';

const SERVER_URL = 'http://localhost:3000/api';

async function loadRiddlesDB() {
    try {
        const response = await fetch(`${SERVER_URL}/riddles`);
        return await response.json();
    } catch (e) {
        console.error("Error connecting to server:", e.message);
        return [];
    }
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

async function mainMenu() {
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
                await playGame();
                break;
            case '2':
                await createRiddle();
                break;
            case '3':
                await readRiddles();
                break;
            case '4':
                await updateRiddle();
                break;
            case '5':
                await deleteRiddle();
                break;
            case '6':
                await showLeaderboard();
                break;
            case '7':
                console.log("Goodbye!");
                process.exit(0);
            default:
                console.log("Invalid choice, please try again.");
        }
    }
}

async function playGame() {
    const riddlesData = await loadRiddlesDB();
    if (riddlesData.length === 0) {
        console.log("No riddles found in database! Please create some first.");
        return;
    }

    const playerName = readline.question("What is your name? ");
    
    const playerRes = await fetch(`${SERVER_URL}/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName })
    });
    const { player, isNew } = await playerRes.json();

    if (isNew) {
        console.log(`Welcome, ${player.name}! Added you to the player database.`);
    } else if (player.lowestTime) {
        console.log(`Hi ${player.name}! Your previous lowest time was ${player.lowestTime} seconds.`);
    } else {
        console.log(`Welcome back, ${player.name}! You don't have a recorded best time yet.`);
    }

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

    const updateRes = await fetch(`${SERVER_URL}/players/${player.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalGameTime })
    });
    const updateData = await updateRes.json();

    console.log(`\nGreat job, ${player.name}!`);
    console.log(`Your time: ${totalGameTime} seconds`);
    if (updateData.isNewRecord) {
        console.log(`New record! Time updated.`);
    } else {
        console.log(`(Best: ${updateData.player.lowestTime})`);
    }
}

async function createRiddle() {
    console.log("\n--- Create New Riddle ---");
    const name = readline.question("Enter riddle name: ");
    const taskDescription = readline.question("Enter description: ");
    const correctAnswer = readline.question("Enter correct answer: ");
    const difficulty = readline.question("Enter difficulty (easy/medium/hard): ") || "medium";
    const timeLimitInput = readline.question("Enter time limit in seconds (optional): ");
    const hint = readline.question("Enter a hint (optional): ");

    const newRiddle = {
        name,
        taskDescription,
        correctAnswer,
        difficulty,
        timeLimit: timeLimitInput ? parseInt(timeLimitInput) : 20,
        hint: hint || undefined
    };

    const response = await fetch(`${SERVER_URL}/riddles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRiddle)
    });

    if (response.ok) {
        console.log("✔ New riddle successfully saved via server!");
    }
}

async function readRiddles() {
    const riddles = await loadRiddlesDB();
    if (riddles.length === 0) {
        console.log("No riddles in database.");
        return;
    }

    console.log("\n--- All Riddles ---");
    riddles.forEach(r => {
        console.log(`ID: ${r.id} | Name: ${r.name} | Desc: ${r.taskDescription} | Answer: ${r.correctAnswer}`);
    });
}

async function updateRiddle() {
    const riddles = await loadRiddlesDB();
    if (riddles.length === 0) {
        console.log("No riddles to update.");
        return;
    }

    await readRiddles();
    const idInput = readline.question("Enter the ID of the riddle you want to update: ");
    const id = parseInt(idInput);

    const target = riddles.find(r => r.id === id);
    if (!target) {
        console.log("Riddle with this ID not found.");
        return;
    }

    console.log(`Updating riddle: ${target.name}`);
    const newName = readline.question(`New name (leave blank to keep current): `);
    const newDesc = readline.question(`New description (leave blank to keep current): `);
    const newAns = readline.question(`New correct answer (leave blank to keep current): `);

    const updatedFields = {};
    if (newName) updatedFields.name = newName;
    if (newDesc) updatedFields.taskDescription = newDesc;
    if (newAns) updatedFields.correctAnswer = newAns;

    const response = await fetch(`${SERVER_URL}/riddles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
    });

    if (response.ok) {
        console.log("✔ Riddle updated successfully via server!");
    }
}

async function deleteRiddle() {
    const riddles = await loadRiddlesDB();
    if (riddles.length === 0) {
        console.log("No riddles to delete.");
        return;
    }

    await readRiddles();
    const idInput = readline.question("Enter the ID of the riddle you want to delete: ");
    const id = parseInt(idInput);

    const response = await fetch(`${SERVER_URL}/riddles/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log("✔ Riddle deleted successfully via server!");
    } else {
        console.log("Riddle ID not found.");
    }
}

async function showLeaderboard() {
    try {
        const response = await fetch(`${SERVER_URL}/players`);
        const players = await response.json();
        
        const validPlayers = players.filter(p => p.lowestTime !== null);
        validPlayers.sort((a, b) => a.lowestTime - b.lowestTime);

        console.log("\n🏆 Leaderboard:");
        if (validPlayers.length === 0) {
            console.log("No completed games yet!");
            return;
        }

        validPlayers.forEach((p, index) => {
            console.log(`${index + 1}. ${p.name} - ${p.lowestTime} seconds`);
        });
    } catch (e) {
        console.error("Error fetching leaderboard:", e.message);
    }
}

mainManager();
mainMenu();