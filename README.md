# 📚 Library Management System

A RESTful API built using **TypeScript**, **Express**, **Node.js**, and **MongoDB (Mongoose)** to manage books and borrowing functionality for a library.

---

## 🚀 Features

- Add, update, delete, and list books
- Borrow a book (with inventory tracking)
- Get borrowed books summary (aggregation)
- Mongoose middlewares for:
  - Trimming book data
  - Cascading deletes of borrowed records
- Full error handling with detailed validation structure

---

## 🛠 Tech Stack

- TypeScript
- Node.js
- Express.js
- MongoDB + Mongoose
- REST API

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/library-management-api.git
   cd library-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```bash
   cp .env.example .env
   ```

   Fill in your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://localhost:27017/library-management
   PORT=5000
   ```

4. **Run the server**
   ```bash
   npm run dev
   ```

---

## 🧪 API Endpoints

### 📘 Books

| Method | Endpoint           | Description                   |
|--------|--------------------|-------------------------------|
| POST   | `/api/books`       | Add a new book                |
| GET    | `/api/books`       | Get all books                 |
| GET    |`/api/books/:bookId`| Get a book by ID              |
| PUT    |`/api/books/:bookId`| Update book details           |
| DELETE |`/api/books/:bookId`| Delete a book+related borrows |

#### 📤 Book Schema

```json
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "FICTION",
  "isbn": "9780451524935",
  "description": "A dystopian novel.",
  "copies": 5,
  "available": true
}
```

---

### 📚 Borrow

| Method | Endpoint      | Description                               |
|--------|---------------|-------------------------------------------|
| POST   | `/api/borrow` | Borrow a book (with quantity & due date)  |
| GET    | `/api/borrow` | Borrow summary (aggregation by book)      |

#### 📤 Borrow Schema (POST)

```json
{
  "book": "665fdb287d4a5b3d768e45a1",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### 📥 Borrow Summary (GET)

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## ✅ Validation & Error Response

Standard error format:
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

## 🔁 Mongoose Middleware Usage

- `pre('save')` on Book: Trims `title` and `author`
- `post('findOneAndDelete')` on Book: Deletes all related borrow records

---

## 🧼 Scripts

```bash
npm run dev       # Start dev server with ts-node-dev
npm run build     # Compile TypeScript to JS
npm start         # Run compiled JavaScript
```

---

## ✨ Live Link

Live Link [Library Management System API](https://library-management-api-xi-lac.vercel.app/)