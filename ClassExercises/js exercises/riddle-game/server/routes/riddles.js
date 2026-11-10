import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = Router();
const dbPath = path.resolve('server/db/riddles.txt');

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
    const riddles = await readDB();
    res.json(riddles);
});

router.post('/', async (req, res) => {
    const riddles = await readDB();
    const newId = riddles.length > 0 ? Math.max(...riddles.map(r => r.id)) + 1 : 1;
    
    const newRiddle = {
        id: newId,
        ...req.body
    };

    riddles.push(newRiddle);
    await writeDB(riddles);
    res.status(201).json(newRiddle);
});

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const riddles = await readDB();
    const index = riddles.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Riddle not found' });
    }

    riddles[index] = { ...riddles[index], ...req.body, id };
    await writeDB(riddles);
    res.json(riddles[index]);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let riddles = await readDB();
    const filtered = riddles.filter(r => r.id !== id);

    if (filtered.length === riddles.length) {
        return res.status(404).json({ error: 'Riddle not found' });
    }

    await writeDB(filtered);
    res.json({ message: 'Riddle deleted successfully' });
});

export default router;