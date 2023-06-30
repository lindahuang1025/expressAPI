const express = require('express');
const {db} = require('./db');
const app = express();

// create table Users:
GET('/users/create', () => db.users.create());

// add some initial records:
GET('/users/init', () => db.users.init());

// remove all records from the table:
GET('/users/empty', () => db.users.empty());

// drop the table:
GET('/users/drop', () => db.users.drop());

// add a new user, if it doesn't exist yet, and return the object:
GET('/users/add/:name', req => {
    return db.task('add-user', async t => {
        const user = await t.users.findByName(req.params.name);
        return user || t.users.add(req.params.name);
    });
});

// find a user by id:
GET('/users/find/:id', req => db.users.findById(req.params.id));

// remove a user by id:
GET('/users/remove/:id', req => db.users.remove(req.params.id));

// get all users:
GET('/users/all', () => db.users.all());

// count all users:
GET('/users/total', () => db.users.total());

// Generic GET handler;
function GET(url, handler) {
    app.get(url, async (req, res) => {
        try {
            const data = await handler(req);
            res.json({
                success: true,
                data
            });
        } catch (error) {
            res.json({
                success: false,
                error: error.message || error
            });
        }
    });
}

const port = 5000;

app.listen(port, () => {
    console.log('\nReady for GET requests on http://localhost:' + port);
});
