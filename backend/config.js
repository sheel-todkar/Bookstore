const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/book-store';

module.exports = { PORT, MONGODB_URI };
