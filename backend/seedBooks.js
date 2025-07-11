const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const { Book } = require('./models/bookModel');

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedYear: 1960,
  },
  {
    title: '1984',
    author: 'George Orwell',
    publishedYear: 1949,
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    publishedYear: 1813,
  },
];

async function seedBooks() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await Book.deleteMany({});
    console.log('Cleared existing books');

    const inserted = await Book.insertMany(sampleBooks);
    console.log(`Inserted ${inserted.length} sample books`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
}

seedBooks();
