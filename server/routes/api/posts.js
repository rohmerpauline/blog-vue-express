const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

// Get Blog Post
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Blog Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  const { title, subheading, content } = req.body;
  await posts.insertOne({
    title: title,
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
