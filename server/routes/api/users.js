const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');

// Add new user
router.post('/', async (req, res) => {
  try {
    const users = await loadUsersCollection();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword };

    await users.insertOne(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send();
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  const users = await loadUsersCollection();
  await users.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(201).send();
});

// Login
router.post('/login', async (req, res) => {
  const users = await loadUsersCollection();
  const user = await users.findOne({ username: req.body.username });
  if (user === null) {
    return res.status(404).json({ message: 'User not found' });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const username = user.username;
      return res.status(200).json({ message: 'Success', username });
    } else {
      return res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).send();
  }
});

async function loadUsersCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://rohmerpauline3:TEQOKjqOc5zkZG9U@vueexpressblog.rzomrkj.mongodb.net/?retryWrites=true&w=majority&appName=vueexpressblog',
    {
      useNewUrlParser: true,
    },
  );

  return client.db('vueexpress').collection('users');
}

module.exports = router;
