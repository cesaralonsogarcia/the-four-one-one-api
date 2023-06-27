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
        username: 'ritaora',
        email: 'rita@mail.com',
    },
    {
        username: 'mileycyrus',
        email: 'miley@mail.com',
    },
    {
        username: 'ladygaga',
        email: 'ldgg@mail.com',
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
    },
    {
        username: 'raye',
        email: 'raye@mail.com',
    },
];

const thoughts = [
    {
        thoughtText: 'Check out my new song!',
        createdAt: '06/12/2023',
        username: 'dualipa',
    },
    {
        thoughtText: 'I am on the Eras Tour!',
        createdAt: '03/18/2023',
        username: 'taylorswift',
    },
    {
        thoughtText: 'I am on the Sweetener Tour!',
        createdAt: '03/18/2019',
        username: 'arianagrande',
    },
    {
        thoughtText: 'Listen to Reinassance!',
        createdAt: '07/29/2022',
        username: 'beyonce',
    },
    {
        thoughtText: 'I will be performing at the CapitalFM Summertime Ball!',
        createdAt: '04/18/2023',
        username: 'zaralarsson',
    },
];

// Get users
const getUsers = () => {
    return users;
};

// Get thoughts
const getThoughts = () => {
    return thoughts;
};

module.exports = { getUsers, getThoughts };