const pgPromise = require('pg-promise'); // pg-promise core library
const dbConfig = require('../db-config.json'); // db connection details
const {Diagnostics} = require('./diagnostics'); // optional diagnostics
const {Users} = require('./repos');
let dotenv = require('dotenv').config()

// pg-promise initialization options:
const initOptions = {
    extend(obj, dc) {
        obj.users = new Users(obj, pgp);
    }
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_DB } = dotenv.parsed;
let connectStr = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:5432/${POSTGRES_DB}`;
const cn = {
    connectionString: connectStr,
    max: 30,
    query_timeout: 60000
};
const db = pgp(cn);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
module.exports = {db, pgp};
