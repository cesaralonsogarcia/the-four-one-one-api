const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Connected');

    // Drop existing thoughts
    await Thought.deleteMany({});

    // Drop existing users
    await User.deleteMany({});

    // Create empty array to hold the users
    const users = [];

    // Loop 20 times -- add students to the students array
    for (let i = 0; i < 20; i++) {
        // Get some random thought objects using a helper function that we imported from ./data
        const reactions = getRandomReactions(20);

        const users = getRandomUser();

        users.push(reactions);
    }

    // Add users to the collection and await results
    await User.collection.insertMany(users);

    // Add thoughts to the collection and await results
    await Thought.collection.insertOne({
        thoughtText: 'I love the way you think!',
        user: users[0]._id,
    });

    // Log out the seed data to indicate what should appear in the database
    console.log(users);
    console.info('Seeding complete!');
    process.exit(0);
});