<template>
  <div class="page-container">
    <div class="content-container">
      <h1>Add Book</h1>
      <form @submit.prevent="addBook">
        <div class="form-group">
          <label for="isbn">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" required />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <button type="submit">Add Book</button>
      </form>

      <h2>Retrieve Books</h2>
      <form @submit.prevent="retrieveBooks">
        <div class="form-group">
          <label for="minIsbn">Where Minimum ISBN IS:</label>
          <input type="number" v-model="minIsbn" id="minIsbn" placeholder="Enter minimum ISBN" required />
        </div>
        <div class="form-group">
          <label for="limit">Limit No. of Results:</label>
          <input type="number" v-model="resultLimit" id="limit" value="5" required />
        </div>
        <div class="form-group">
          <label for="order">Order by ISBN No.:</label>
          <select v-model="orderDirection" id="order">
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>
        <button type="submit">Retrieve Books</button>
      </form>

      <h2>Retrieved Books</h2>
      <ul class="book-list">
        <li v-for="book in books" :key="book.id">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="editBook(book)">Edit</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </li>
      </ul>
    </div>
    <!-- Include the BookList component at the bottom -->
    <BookList />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '../main.js'; // Firebase init file
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, limit } from 'firebase/firestore'; // Firestore functions
import BookList from '../components/BookList.vue'; // Import BookList component

export default {
  components: {
    BookList // Register BookList component
  },
  setup() {
    const isbn = ref('');
    const name = ref('');
    const minIsbn = ref(0);
    const resultLimit = ref(5);
    const orderDirection = ref('asc');
    const books = ref([]);
    const isEditing = ref(false);
    const currentBookId = ref(null);

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        if (isEditing.value) {
          // Update book if in edit mode
          await updateDoc(doc(db, 'books', currentBookId.value), {
            isbn: isbnNumber,
            name: name.value,
          });
          isEditing.value = false;
          alert('Book updated successfully!');
        } else {
          // Add new book
          await addDoc(collection(db, 'books'), {
            isbn: isbnNumber,
            name: name.value,
          });
          alert('Book added successfully!');
        }

        // Reset form
        isbn.value = '';
        name.value = '';
        fetchBooks();
      } catch (error) {
        console.error('Error adding or updating book: ', error);
      }
    };

    const retrieveBooks = async () => {
      try {
        // Query to filter books based on user input and limit results
        const booksQuery = query(
          collection(db, 'books'),
          where('isbn', '>=', Number(minIsbn.value)),
          orderBy('isbn', orderDirection.value),
          limit(Number(resultLimit.value))
        );

        const querySnapshot = await getDocs(booksQuery);
        books.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const fetchBooks = async () => {
      try {
        // Fetch books by default when component loads
        const booksQuery = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn'),
          limit(10)
        );

        const querySnapshot = await getDocs(booksQuery);
        books.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const editBook = (book) => {
      isbn.value = book.isbn;
      name.value = book.name;
      currentBookId.value = book.id;
      isEditing.value = true;
    };

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
        alert('Book deleted successfully!');
        retrieveBooks(); // Refresh retrieved books after deletion
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      isbn,
      name,
      minIsbn,
      resultLimit,
      orderDirection,
      books,
      addBook,
      retrieveBooks,
      editBook,
      deleteBook,
    };
  },
};
</script>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.content-container {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  margin-bottom: 20px;
}

form {
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3367d6;
}

ul {
  padding-left: 20px;
}

.book-list {
  padding-left: 40px;
  margin-top: 20px;
}

.book-list li {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}
</style>
