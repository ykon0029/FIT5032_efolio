const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

// Function to count the total number of books
exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

// Function to get all books from the Firestore collection
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      // Create an array to hold the book data
      const books = [];
      snapshot.forEach((doc) => {
        books.push(doc.data());// Push each book document into the array
      });

      res.status(200).send(books);// Return all books as JSON
    } catch (error) {
      console.error("Error retrieving books:", error.message);
      res.status(500).send("Error retrieving books");
    }
  });
});


// Function to get all books from the Firestore collection
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      // Create an array to hold the book data
      const books = [];
      snapshot.forEach((doc) => {
        books.push(doc.data()); // Push each book document into the array
      });

      res.status(200).send(books); // Return all books as JSON
    } catch (error) {
      console.error("Error retrieving books:", error.message);
      res.status(500).send("Error retrieving books");
    }
  });
});


// Function to add a new book with ISBN and name fields
exports.addBook = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;

      // Check if both ISBN and name are provided
      if (!isbn || !name) {
        res.status(400).send("ISBN and name are required.");
        return;
      }

      // Add the new book to Firestore with capitalized fields
      await admin.firestore().collection("books").add({
        isbn: isbn.toUpperCase(),
        name: name.toUpperCase(),
      });

      res.status(200).send("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error.message);
      res.status(500).send("Error adding book");
    }
  });
});

// Firestore trigger to capitalize book data on creation
exports.capitalizeBookData = onDocumentCreated("books/{bookId}", (event) => {
  const book = event.data.data();
  const bookId = event.params.bookId;

  // Capitalize book fields
  const capitalizedData = {
    isbn: book.isbn.toUpperCase(),
    name: book.name.toUpperCase(),
  };

  // Update the document with capitalized data
  return admin.firestore()
      .collection("books")
      .doc(bookId)
      .update(capitalizedData)
      .then(() => {
        console.log(
            `Successfully updated book ${bookId} with capitalized data.`);
      })
      .catch((error) => {
        console.error(`Error updating book ${bookId}:`, error);
      });
});


