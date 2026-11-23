# 📚 BookNook Backend — RESTful API

The backend service for **BookNook**, a community-driven book-sharing platform. Built with Node.js, Express.js, and MongoDB, this REST API handles book management, user-specific book collections, borrowing operations, and secure API access through Better Auth JWT verification.

🌐 **Live Frontend:** [https://mrfizz17-booknook.vercel.app/](https://mrfizz17-booknook.vercel.app/)

🔗 **Backend Repository:** [booknook_backend](https://github.com/mrfizz17/booknook_backend)

---

## ✨ Key Features

- **RESTful API:** Provides structured API endpoints for seamless communication with the BookNook frontend.
- **MongoDB Integration:** Stores and manages books, categories, and borrowing records using MongoDB.
- **JWT Authentication:** Verifies access tokens using Better Auth's remote JSON Web Key Set (JWKS) and the JOSE library.
- **Book Management:** Supports adding, retrieving, updating, and deleting book records.
- **Category Management:** Provides API endpoints to retrieve available book categories.
- **New Arrivals:** Fetches the latest six books based on their insertion order.
- **Personal Book Collection:** Retrieves books added by individual users using their email addresses.
- **Borrowing System:** Allows authenticated users to borrow available books.
- **Duplicate Borrow Prevention:** Prevents users from borrowing the same book again while an existing borrowing record is present.
- **Book Availability Tracking:** Automatically decreases the available copy count when a book is borrowed.
- **Book Return System:** Allows users to return borrowed books and restores the available copy count.
- **Automatic Borrow Record Cleanup:** Removes associated borrowing records when a book is deleted.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| MongoDB Native Driver | Database operations |
| JOSE | JWT verification |
| Better Auth | Authentication and JWKS |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

---

## 📂 Project Structure

```text
booknook_backend/
│
├── index.js              # Express server and API routes
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Dependency lock file
├── .env                  # Environment variables (not committed)
└── .gitignore
```

---

## 🔌 API Endpoints

All endpoints use the `/api` prefix.

### 📖 Books

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/all-books` | Retrieve all books | Public |
| GET | `/api/new-arrival` | Retrieve the latest six books | Public |
| GET | `/api/all-books/:id` | Retrieve a single book by ID | Required |
| POST | `/api/add-books` | Add a new book | Required |

### 📚 Categories

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/categories` | Retrieve all book categories | Public |

### 👤 My Books

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| GET | `/api/my-books/:email` | Retrieve books added by a user | Required |
| PATCH | `/api/my-books/update/:id` | Update a book | Required |
| DELETE | `/api/my-books/delete/:id` | Delete a book and associated borrow records | Required |

### 🔄 Borrowing System

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/my-books/borrow/:id` | Borrow an available book | Required |
| GET | `/api/my-borrowed/:email` | Retrieve a user's borrowed books | Required |
| DELETE | `/api/my-borrows/delete/:id/:email` | Return a borrowed book | Required |

**Authentication:** Protected endpoints require a valid Better Auth JWT in the request header.

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## ⚙️ Getting Started

Follow these instructions to run the backend locally.

### 1. Clone the repository

```bash
git clone https://github.com/mrfizz17/booknook_backend.git
```

### 2. Navigate to the project directory

```bash
cd booknook_backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=your_better_auth_base_url
```

**Environment variable details:**

- `PORT`: Port on which the Express server runs.
- `MONGODB_URI`: MongoDB connection string.
- `NEXT_PUBLIC_API_URL`: Base URL of your Better Auth server, used to retrieve the JWKS endpoint for JWT verification.

### 5. Start the server

```bash
node index.js
```

The server will start at:

```text
http://localhost:8000
```

---

## 🗄️ Database Collections

The application uses the `booknookdb` database with three MongoDB collections:

| Collection | Responsibility |
|---|---|
| `allbooks` | Stores book information and available copy counts |
| `categoriesName` | Stores book categories |
| `borrow` | Stores borrowing records and user information |

---

## 🔐 Authentication Flow

BookNook uses Better Auth for authentication and JWT-based API authorization.

1. A user authenticates through the frontend using Better Auth.
2. The frontend obtains a JWT access token.
3. The token is sent to protected backend endpoints through the `Authorization` header.
4. Express middleware extracts the token from the request.
5. JOSE verifies the token using Better Auth's remote JWKS endpoint.
6. If verification succeeds, the request proceeds to the protected API route; otherwise, the server returns an unauthorized-access response.

---

## 🌍 Related Links

- **Live Application:** [BookNook](https://mrfizz17-booknook.vercel.app/)
- **Frontend Repository:** [booknook_frontend](https://github.com/mrfizz17/booknook_frontend)
- **Backend Repository:** [booknook_backend](https://github.com/mrfizz17/booknook_backend)

---

## 👨‍💻 Author

**Mustafizur Rahman Chowdhury**

- GitHub: [@mrfizz17](https://github.com/mrfizz17)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/mustafizur-rahman-b8616930a/)

---

<p align="center">
  <strong>Built with ❤️ for BookNook.</strong>
  <br />
  <em>Powering a community of readers, one book at a time.</em>
</p>
