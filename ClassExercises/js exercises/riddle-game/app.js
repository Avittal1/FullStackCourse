import readline from 'readline-sync';
import fs from 'fs';

import { AllRiddles } from './riddles/allRiddles.js';
import { Riddle } from './classes/Riddle.js';
import { Player } from './classes/Player.js';
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js';

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

console.log("Welcome to the Riddle Game!");

let player;
let riddlesToPlay = [];
let currentIndex = 0;
const progressFile = 'progress.json';

if (fs.existsSync(progressFile)) {
  const loadChoice = readline.question('Previous progress found. Do you want to resume? (y/n): ');
  if (loadChoice.toLowerCase() === 'y') {
    const savedData = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
    player = new Player(savedData.name);
    player.times = savedData.times || [];
    riddlesToPlay = savedData.riddlesToPlay || [];
    currentIndex = savedData.currentIndex || 0;
    console.log(`Welcome back, ${player.name}! Resuming your game...\n`);
  } else {
    fs.unlinkSync(progressFile);
  }
}

if (!player) {
  const playerName = readline.question("What is your name? ");
  player = new Player(playerName);

  console.log(`Hello, ${player.name}! Let's start the game.\n`);
  const level = readline.question('Choose difficulty: easy / medium / hard: ');
  const filteredRiddles = AllRiddles.filter(r => r.difficulty === level);

  if (filteredRiddles.length === 0) {
    console.log("No riddles found for this difficulty!");
    process.exit();
  }

  riddlesToPlay = shuffleArray(filteredRiddles);
}

for (let i = currentIndex; i < riddlesToPlay.length; i++) {
  const riddleData = riddlesToPlay[i];
  const riddle = riddleData.choices 
    ? new MultipleChoiceRiddle(riddleData) 
    : new Riddle(riddleData);

  const startTime = Date.now();
  riddle.ask();
  const endTime = Date.now();

  let durationInSeconds = Math.floor((endTime - startTime) / 1000);

  if (riddle.timeLimit && durationInSeconds > riddle.timeLimit) {
    console.log("Too slow! 5 seconds penalty applied.");
    durationInSeconds += 5;
  }

  if (riddle.usedHint) {
    console.log("Hint used! 10 seconds penalty applied.");
    durationInSeconds += 10;
  }

  player.times.push(durationInSeconds);
  currentIndex = i + 1;

  const progressData = {
    name: player.name,
    times: player.times,
    riddlesToPlay: riddlesToPlay,
    currentIndex: currentIndex
  };
  fs.writeFileSync(progressFile, JSON.stringify(progressData, null, 2));
}

player.showStats();

if (fs.existsSync(progressFile)) {  fs.unlinkSync(progressFile); }