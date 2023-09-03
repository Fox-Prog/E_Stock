const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
const port = 4000

app.use(cors())

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'fpdb'
})

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err)
  } else {
    console.log('Connecté à la base de données')
  }
})