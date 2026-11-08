import fs from 'fs';

const PLAYERS_FILE_PATH = './players/players.txt';

export class Player {
    constructor(name) {
        this.name = name;
        this.times = [];
    }

    static #loadPlayersData() {
        if (!fs.existsSync(PLAYERS_FILE_PATH)) {
            return [];
        }
        try {
            const data = fs.readFileSync(PLAYERS_FILE_PATH, 'utf8');
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    }

    static #savePlayersData(players) {
        fs.writeFileSync(PLAYERS_FILE_PATH, JSON.stringify(players, null, 2));
    }

    static handlePlayerLogin(playerName) {
        let players = Player.#loadPlayersData();
        let playerRecord = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());

        if (playerRecord) {
            if (playerRecord.lowestTime) {
                console.log(`Hi ${playerRecord.name}! Your previous lowest time was ${playerRecord.lowestTime} seconds.`);
            } else {
                console.log(`Welcome back, ${playerRecord.name}! You don't have a recorded best time yet.`);
            }
        } else {
            playerRecord = {
                id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
                name: playerName,
                lowestTime: null
            };
            players.push(playerRecord);
            Player.#savePlayersData(players);
            console.log(`Welcome, ${playerName}! Added you to the player database.`);
        }

        return playerRecord;
    }

    static updatePlayerScore(playerName, totalGameTime) {
        let players = Player.#loadPlayersData();
        let playerRecord = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());

        if (playerRecord) {
            if (!playerRecord.lowestTime || totalGameTime < playerRecord.lowestTime) {
                playerRecord.lowestTime = totalGameTime;
                console.log(`\nGreat job, ${playerName}!`);
                console.log(`Your time: ${totalGameTime} seconds`);
                console.log(`New record! Time updated.`);
            } else {
                console.log(`\nGreat job, ${playerName}!`);
                console.log(`Your time: ${totalGameTime} seconds (Best: ${playerRecord.lowestTime})`);
            }
            Player.#savePlayersData(players);
        }
    }

    static showLeaderboard() {
        let players = Player.#loadPlayersData();
        
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
    }

    recordTime(start, end) {
        const durationInSeconds = Math.floor((end - start) / 1000);
        this.times.push(durationInSeconds);
    }
}