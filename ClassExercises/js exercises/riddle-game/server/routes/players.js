import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = Router();
const dbPath = path.resolve('server/db/players.txt');

async function readDB() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

async function writeDB(data) {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

router.get('/', async (req, res) => {
    const players = await readDB();
    res.json(players);
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const players = await readDB();
    let player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!player) {
        player = {
            id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
            name,
            lowestTime: null
        };
        players.push(player);
        await writeDB(players);
        return res.status(201).json({ player, isNew: true });
    }

    res.json({ player, isNew: false });
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { totalGameTime } = req.body;
    const players = await readDB();
    const player = players.find(p => p.id === id);

    if (!player) {
        return res.status(404).json({ error: 'Player not found' });
    }

    let isNewRecord = false;
    if (player.lowestTime === null || totalGameTime < player.lowestTime) {
        player.lowestTime = totalGameTime;
        isNewRecord = true;
    }

    await writeDB(players);
    res.json({ player, isNewRecord });
});

export default router;