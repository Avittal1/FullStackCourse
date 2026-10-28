import readline from 'readline-sync';

import { AllRiddles } from './riddles/allRiddles.js';
import { Riddle } from './classes/Riddle.js';
import { Player } from './classes/Player.js';
import MultipleChoiceRiddle from './classes/MultipleChoiceRiddle.js';

console.log("Welcome to the Riddle Game!");
const playerName = readline.question("What is your name? ");
const player = new Player(playerName);

console.log(`Hello, ${player.name}! Let's start the game.\n`);

//const riddles = AllRiddles.map(data => new Riddle(data));

for (const riddleData of AllRiddles) {
  const riddle = riddleData.choices 
    ? new MultipleChoiceRiddle(riddleData) 
    : new Riddle(riddleData);

  const startTime = Date.now();
  riddle.ask();
  const endTime = Date.now();

  player.recordTime(startTime, endTime);
}

player.showStats();