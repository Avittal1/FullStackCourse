import express from 'express';
import { posts, comments } from './posts.js';

const router = express.Router({ mergeParams: true });

const checkPostExists = (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const post = posts.find(p => p.id === postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  next();
};

router.use(checkPostExists);

router.get('/', (req, res) => {
  const postId = req.params.postId;
  res.json(comments[postId] || []);
});

router.post('/', (req, res) => {
  const postId = req.params.postId;
  const newComment = { id: Date.now(), text: req.body.text };
  
  comments[postId] = comments[postId] || [];
  comments[postId].push(newComment);
  
  res.status(201).json(newComment);
});

export default router;