const Datastore = require('nedb-promises');
const path = require('path');
const fs = require('fs');

const DB_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const users    = Datastore.create({ filename: path.join(DB_DIR, 'users.db'),    autoload: true });
const posts    = Datastore.create({ filename: path.join(DB_DIR, 'posts.db'),    autoload: true });
const comments = Datastore.create({ filename: path.join(DB_DIR, 'comments.db'), autoload: true });
const likes    = Datastore.create({ filename: path.join(DB_DIR, 'likes.db'),    autoload: true });

// Indexes
users.ensureIndex({ fieldName: 'email',    unique: true });
users.ensureIndex({ fieldName: 'username', unique: true });
posts.ensureIndex({ fieldName: 'slug',     unique: true });
posts.ensureIndex({ fieldName: 'author_id' });
comments.ensureIndex({ fieldName: 'post_id' });
likes.ensureIndex({ fieldName: 'post_id' });
likes.ensureIndex({ fieldName: 'user_id' });

console.log('✅ Database (NeDB) initialized');

module.exports = { users, posts, comments, likes };
