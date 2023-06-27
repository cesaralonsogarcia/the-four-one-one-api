const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { get } = require('../models/Reaction');
const { getUsers, getThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected');

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

    // Create empty array to hold the users and thoughts
    const users = getUsers();
    const thoughts = getThoughts();

    // Add users to the collection and await results
    await User.collection.insertMany(users);

    // Add thoughts to the collection and await results
    await Thought.collection.insertMany(thoughts);

    // Log out the seed data to indicate what should appear in the database
    console.info('Seeding complete!');
    process.exit(0);
});