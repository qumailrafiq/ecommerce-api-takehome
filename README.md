# 🛒 E-commerce API (Express + MongoDB)

A clean and scalable backend for an e-commerce system built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.  
Implements user authentication, role-based access control, product management, shopping cart, and order processing.

---

## 🚀 Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/ecommerce-api-takehome.git
cd ecommerce-api-takehome
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment
Create a .env file in the project root:

ini
Copy code
PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce_test
JWT_SECRET=supersecret_jwt_key
JWT_EXPIRES_IN=1d
4️⃣ Start Server
bash
Copy code
npm run dev
Server runs at ➜ http://localhost:4000

🧱 Architecture Overview
This project follows a modular, layered architecture:

markdown
Copy code
Controller → Service → Repository → Model → Database
        ↑
      Routes
Layer	Responsibility
Controllers	Handle HTTP requests and responses.
Services	Contain business logic (auth, cart, stock updates).
Repositories	Abstract database queries (Mongoose).
Models	Define schema for MongoDB collections.
Middlewares	Handle authentication, errors, and access control.

Why this architecture?

Encourages clean separation of concerns.

Makes testing and future scaling (e.g. switch to SQL) easier.

Keeps the codebase readable and maintainable.

🗺️ Entity Relationship Diagram (ERD)
mermaid
Copy code
erDiagram

    USER {
        ObjectId _id
        string name
        string email
        string password
        string role
        date createdAt
        date updatedAt
    }

    CATEGORY {
        ObjectId _id
        string name
    }

    PRODUCT {
        ObjectId _id
        string name
        string description
        number price
        number stockQuantity
        ObjectId categoryId
        date createdAt
        date updatedAt
    }

    CART {
        ObjectId _id
        ObjectId userId
        number totalPrice
        date updatedAt
    }

    CART_ITEM {
        ObjectId productId
        number quantity
        number subtotal
    }

    ORDER {
        ObjectId _id
        ObjectId userId
        number totalPrice
        string status
        date createdAt
    }

    ORDER_ITEM {
        ObjectId productId
        number quantity
        number price
    }

    USER ||--o{ CART : "has"
    CART ||--|{ CART_ITEM : "contains"
    CART_ITEM }o--|| PRODUCT : "references"

    USER ||--o{ ORDER : "places"
    ORDER ||--|{ ORDER_ITEM : "contains"
    ORDER_ITEM }o--|| PRODUCT : "references"

    CATEGORY ||--o{ PRODUCT : "categorizes"
🔐 Authentication
JWT-based authentication with roles:

Admin: Manage products, view all orders.

Customer: Browse products, manage cart, place orders.

Each logged-in user has one active cart tied to their session —
when the user logs out or places an order, the cart is automatically cleared.

📡 API Endpoints
🧍‍♂️ User Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT
POST	/api/auth/logout	Logout and clear cart (requires token)

Example: Register

bash
Copy code
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
Response

json
Copy code
{
  "data": {
    "id": "672be62f...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
🛍️ Products
Method	Endpoint	Access	Description
GET	/api/products	Public	List all products with pagination/filtering
GET	/api/products/:id	Public	Get product details
POST	/api/products	Admin	Create product
PUT	/api/products/:id	Admin	Update product
DELETE	/api/products/:id	Admin	Delete product

Example: Filter by category and price

bash
Copy code
GET /api/products?category=electronics&minPrice=100&maxPrice=1000&page=1&limit=10
🛒 Cart
Method	Endpoint	Description
GET	/api/cart	Get current user cart
POST	/api/cart	Add product to cart { productId, quantity }
PUT	/api/cart/:productId	Update quantity { quantity }
DELETE	/api/cart/:productId	Remove product from cart

Example: Add to cart

bash
Copy code
POST /api/cart
Authorization: Bearer <token>

{
  "productId": "67301a8d...",
  "quantity": 2
}
Response

json
Copy code
{
  "data": {
    "userId": "672be62f...",
    "items": [
      {
        "productId": "67301a8d...",
        "quantity": 2,
        "subtotal": 400
      }
    ],
    "totalPrice": 400
  }
}
📦 Orders
Method	Endpoint	Access	Description
POST	/api/orders	Customer	Place order from cart
GET	/api/orders	Customer	Get user’s order history
GET	/api/orders/all	Admin	Get all orders

Example: Place Order

bash
Copy code
POST /api/orders
Authorization: Bearer <token>
Response

json
Copy code
{
  "data": {
    "userId": "672be62f...",
    "totalPrice": 400,
    "status": "placed",
    "items": [
      {
        "productId": "67301a8d...",
        "quantity": 2,
        "price": 200
      }
    ]
  }
}
🧠 Architecture Decisions
Express.js + Mongoose

Lightweight, fast to set up, perfect for take-home demonstration.

MongoDB’s flexible schema fits dynamic product attributes.

Layered Architecture

Separates controllers, services, repositories → improves testability & clarity.

JWT Auth (Stateless)

Simplifies horizontal scaling — no session store needed.

“Cart tied to session” is simulated by clearing cart on logout/order.

Error Handling

Centralized middleware handles all exceptions consistently.

Extensibility

Easy to plug in Redis for caching or a payment gateway service later.

⚖️ Assumptions & Trade-offs
Area	Decision	Reason
Authentication	Stateless JWT	Simple, scalable, widely accepted.
Cart lifetime	Cleared on logout/order	Mimics session-bound behavior.
Transactions	Not used (demo-level)	Simplicity > atomicity for take-home test.
Validation	Basic checks only	Could be extended with Joi or express-validator.
Logout	Clears cart, no token blacklist	Enough for stateless JWT demo.
Performance	Indexes on price, categoryId	Speeds up product filters.

✅ Evaluation Highlights
API Design: RESTful, clean routes, meaningful status codes.

Database Design: Proper relationships, indexed fields for efficiency.

Error Handling: Centralized via middleware.

Code Quality: Modular, testable, and readable.

Documentation: Covers setup, endpoints, and rationale.

💬 Author
Qumail Rafiq
Backend Developer — Node.js / Express / MongoDB
📧 qumailreshii@gmail.com
🌐 https://www.linkedin.com/in/qumailreshi/

---