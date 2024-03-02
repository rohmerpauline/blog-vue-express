const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get Blog Post
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();

  const limit = parseInt(req.query.limit, 10);
  let query = posts.find({}).sort({ createdAt: -1 });

  if (!isNaN(limit) && limit > 0) {
    query = query.limit(limit);
  }

  res.send(await query.toArray());
});

// Add Blog Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  const { title, subheading, content, author } = req.body;
  await posts.insertOne({
    title: title,
    author: author,
    subheading: subheading,
    content: content,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).send();
});

// Delete Blog Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(201).send();
});

// Search Blog Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  const searchKeyword = req.query.keyword;

  if (!searchKeyword) {
    return res.status(400).send({ message: 'Search keyword is required' });
  }

  const searchRegex = new RegExp(searchKeyword, 'i');
  const query = {
    $or: [{ title: { $regex: searchRegex } }, { subheading: { $regex: searchRegex } }],
  };

  const searchResults = await posts.find(query).toArray();
  res.send(searchResults);
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://rohmerpauline3:TEQOKjqOc5zkZG9U@vueexpressblog.rzomrkj.mongodb.net/?retryWrites=true&w=majority&appName=vueexpressblog',
    {
      useNewUrlParser: true,
    },
  );

  return client.db('vueexpress').collection('posts');
}

module.exports = router;
