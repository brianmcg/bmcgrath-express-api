const express = require('express');
const bodyParser = require('body-parser');
const { Post } = require('@models');
const Logger = require('@utils/logger');
const jsonParser = bodyParser.json()
const router = express.Router();

router.get('/', jsonParser, async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', jsonParser, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', jsonParser, async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id',jsonParser, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (post) {
      post.set(req.body);
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', jsonParser, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (post) {
      await post.destroy();
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
