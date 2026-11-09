import express from 'express';

const router = express.Router();

let users = [{ id: 1, name: 'Alice' }];

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const newUser = { id: Date.now(), name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  user.name = req.body.name || user.name;
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(index, 1);
  res.status(204).send();
});

export default router;