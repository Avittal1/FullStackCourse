import readline from 'readline-sync';

export class Riddle {
    constructor(riddleData) {
        this.id = riddleData.id;
        this.name = riddleData.name;
        this.taskDescription = riddleData.taskDescription;
        this.correctAnswer = riddleData.correctAnswer;
    }

    ask() {
        console.log(`\nRiddle ${this.id}: ${this.name}`);
        while (true) {
            const userAnswer = readline.question(`${this.taskDescription}: `);
            
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