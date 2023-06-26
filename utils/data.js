const users = [
    {
        username: 'dualipa',
        email: 'dua@mail.com',
    },
    {
        username: 'taylorswift',
        email: 'ts@mail.com',
    },
    {
        username: 'arianagrande',
        email: 'ari@mail.com',
    },
    {
        username: 'selenagomez',
        email: 'sgomez@mail.com',
    },
    {
        username: 'mileycyrus',
        email: 'miley@mail.com',
    },
    {
        username: 'katyperry',
        email: 'perry@mail.com',
    },
    {
        username: 'ladygaga',
        email: 'ldgg@mail.com',
    },
    {
        username: 'billieeilish',
        email: 'billie@mail.com',
    },
    {
        username: 'shakira',
        email: 'shakira@mail.com',
    },
    {   
        username: 'zaralarsson',
        email: 'zara@mail.com',
    },
    {
        username: 'beyonce',
        email: 'bey@mail.com',
    },
    {
        username: 'badgalriri',
        email: 'rihanna@mail.com',
    },
    {
        username: 'adele',
        email: 'adele@mail.com',
    }
];

const reactions = [
    '😍',
    '😂',
    '😘',
    '😊',
    '😭',
    '😅',
    '😁',
    '😩',
    '😉',
    '😎',
    '😢',
    '😌',
    '😳',
    '😜',
    '😋',
];

// Get a random element from an array
const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get users
const getUsers = () => {
    return users;
};

// Get random reactions
const getRandomReactions = (int) => {
    const reactionsArr = [];

    for (let i = 0; i < int; i++) {
        reactionsArr.push({
            reactionBody: getRandomElement(reactions),
            username: users[i].username,
        });
    }
    return reactionsArr;
}

module.exports = { getUsers, getRandomReactions };