const mysql2 = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()
const {
  plogs,
  users
} = require('../lib/placeholder-data');
const bcrypt = require('bcrypt');
const { exit } = require('process');

async function seedUsers(pool) {
  try {
    const createTable = await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      avatar_url VARCHAR(255)
    );`)

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return pool.execute(`
      INSERT INTO users (id, name, email, password,avatar_url)
      VALUES (?,?,?,?,?)`, [user.id, user.name, user.email, hashedPassword, user.avatar_url])
      })
    );
    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding user:', error);
    throw error;
  }

  
}

async function seedBolg(pool) {
  try {
    const createTable = await pool.execute(`
      CREATE TABLE IF NOT EXISTS blog (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        context VARCHAR(2024) NOT NULL,
        create_time datetime,
        likes INT,
        comments INT,
        poster_id VARCHAR(255) NOT NULL,
        img_urls TEXT
    );`)

    // Insert data into the "users" table
    const insertedBlog = await Promise.all(
      plogs.map(async (plog) => {
        return pool.execute(`
      INSERT INTO blog (id, title, context,create_time,likes,comments,poster_id,img_urls)
      VALUES (?,?,?,?,?,?,?,?)`, [plog.id, plog.title, plog.context, plog.create_time, plog.likes, plog.comments
          , plog.poster_id, plog.img_urls])
      })
    );

    return {
      createTable,
      plogs: insertedBlog,
    };
  } catch (error) {
    console.error('Error seeding plog:', error);
    throw error;
  }

  
}

async function main() {
  const pool = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()
  await seedUsers(pool);
  await seedBolg(pool);
  exit()
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
