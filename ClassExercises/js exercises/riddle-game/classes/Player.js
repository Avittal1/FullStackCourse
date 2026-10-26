export class Player {
    constructor(name) {
        this.name = name;
        this.times = [];
    }

    recordTime(start, end) {
        const durationInSeconds = Math.floor((end - start) / 1000);
        this.times.push(durationInSeconds);
    }

    showStats() {
        const totalTime = this.times.reduce((acc, curr) => acc + curr, 0);
        const avgTime = Math.round(totalTime / this.times.length);

        console.log(`\nGreat job, ${this.name}!`);
        console.log(`Total time: ${totalTime} seconds`);
        console.log(`Average per riddle: ${avgTime} seconds`);
    }
}