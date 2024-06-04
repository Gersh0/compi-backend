
import * as bcrypt from 'bcrypt';

export const USERS_SEED = [
    {
        id: 1,
        email: "john.wick@example.com",
        password: bcrypt.hashSync("Abc123", 10),
        alias: "John Wick",
        rank: "leader",
        missions: []
    }
];