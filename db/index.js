const pgPromise = require('pg-promise'); // pg-promise core library
const dbConfig = require('../db-config.json'); // db connection details
const {Diagnostics} = require('./diagnostics'); // optional diagnostics
const {Users} = require('./repos');

// pg-promise initialization options:
const initOptions = {
    extend(obj, dc) {
        obj.users = new Users(obj, pgp);
    }
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
module.exports = {db, pgp};
