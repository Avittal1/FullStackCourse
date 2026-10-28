import readline from 'readline-sync';
import { Riddle } from './Riddle.js';

export default class MultipleChoiceRiddle extends Riddle {
  constructor(details) {
    super(details);
    this.choices = details.choices;
  }

  ask() {
    console.log(`\n[${this.name}] ${this.taskDescription}`);
    
    this.choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice}`);
    });


    while (true) {
      let userAnswer = readline.question(`${this.taskDescription} (Type 'hint' for a clue): `);

      if (userAnswer.toLowerCase() === 'hint') {
          if (this.hint) {
              console.log(`💡 Hint: ${this.hint}`);
              this.usedHint = true;
          } else {
              console.log("Sorry, no hint available for this riddle.");
          }
          continue;
      }

      if (this.compare(userAnswer)) {
        console.log("Correct!\n");
        break;
      } else {
        console.log("Incorrect! Try again.");
      }
    }
  }
}