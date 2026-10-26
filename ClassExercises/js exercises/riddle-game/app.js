import readline from 'readline-sync';
import { AllRiddles } from './riddles/allRiddles.js';
import { Riddle } from './classes/Riddle.js';
import { Player } from './classes/Player.js';

console.log("Welcome to the Riddle Game!");
const playerName = readline.question("What is your name? ");
const player = new Player(playerName);

const riddles = AllRiddles.map(data => new Riddle(data));

for (let i = 0; i < riddles.length; i++) {
    const currentRiddle = riddles[i];

    const startTime = Date.now();
    
    currentRiddle.ask();
    
    const endTime = Date.now();
    
    player.recordTime(startTime, endTime);
}

player.showStats();