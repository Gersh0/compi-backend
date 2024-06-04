
import * as bcrypt from 'bcrypt';

export const USERS_SEED = [
    {
        id: 1,
        email: "john.wick@example.com",
        password: bcrypt.hashSync("Abc123", 10),
        alias: "John Wick",
        rank: "leader",
        missions: []
    },
    {
        id: 2,
        email: "user1@example.com",
        password: bcrypt.hashSync("Abc123", 10),
        alias: "User 1",
        missions: []
    },
    {
        id: 3,
        email: "user2@example.com",
        password: bcrypt.hashSync("Abc123", 10),
        alias: "User 2",
        missions: []
    },
    {
        id: 4,
        email: "user3@example.com",
        password: bcrypt.hashSync("Abc123", 10),
        alias: "User 3",
        missions: []
    }
];