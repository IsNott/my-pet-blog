const { db } = require('@vercel/postgres');
const {
  plogs,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');