const { Post } = require('@models');
const Logger = require('@utils/logger');

// Controller method to get all Posts
exports.getAll = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to get a Post by ID
exports.getById = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findByPk(id);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to create a new Post
exports.create = async (req, res) => {
  const { name, address, message } = req.body;

  try {
    const post = await Post.create({ name, address, message });
    res.status(201).json(post);
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller method to update a Post by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const { name, address, message } = req.body;

  try {
    const post = await Post.findByPk(id);

    if (post) {
      post.set({ name, address, message });
      await post.save();
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    Logger.error(error.toString())
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method to delete a Post by ID
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findByPk(id);

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
};
