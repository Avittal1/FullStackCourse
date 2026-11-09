import express from 'express';

const router = express.Router();

export const posts = [{ id: 1, title: 'Hello' }];
export const comments = { 1: [] };

router.get('/', (req, res) => {
  res.json(posts);
});

router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

export default router;