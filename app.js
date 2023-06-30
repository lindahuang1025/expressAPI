const express = require('express')
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:123456@localhost:5432/nextdb')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  db.any('SELECT * FROM public.user')
  .then((data) => {
    console.log('DATA:', data)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})