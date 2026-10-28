import readline from 'readline-sync';

export class Riddle {
    constructor(riddleData) {
        this.id = riddleData.id;
        this.name = riddleData.name;
        this.taskDescription = riddleData.taskDescription;
        this.correctAnswer = riddleData.correctAnswer;
        this.difficulty = riddleData.difficulty;
        this.timeLimit = riddleData.timeLimit;
        this.hint = riddleData.hint;
        this.usedHint = false;
    }

    ask() {
        console.log(`\nRiddle ${this.id}: ${this.name}`);
        while (true) {
            const userAnswer = readline.question(`${this.taskDescription} (Type 'hint' for a clue): `);
            
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
                console.log("Correct!");
                break;
            } else {
                console.log("Wrong! Try again.");
            }
        }
    }

    compare(input) {
        return input.trim().toLowerCase() === this.correctAnswer.toLowerCase();
    }
}