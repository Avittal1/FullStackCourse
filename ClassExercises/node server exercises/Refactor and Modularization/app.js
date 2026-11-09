import express from 'express';
import greetRouter from './routes/greet.js';
import usersRouter from './routes/users.js';
import postsRouter, { comments } from './routes/posts.js';
import commentsRouter from './routes/comments.js';

const app = express();

app.use(express.json());

app.use(greetRouter);

app.use('/users', usersRouter);

postsRouter.use('/:postId/comments', commentsRouter);
app.use('/posts', postsRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});