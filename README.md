# E-commerce API (Express + Mongoose)

## Features
- User registration/login with JWT
- Admin & customer roles
- Products (CRUD by admin, list & filter for customers)
- Cart tied to user session (cleared on logout / cleared after order)
- Orders: place order (deduct stock), view order history

## Setup
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
3. PORT=4000
MONGO_URI=mongodb://localhost:27017/ecommerce_test
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
4. npm run dev

---

# Quick usage notes and important behaviors

- **Logout behavior**: `POST /api/auth/logout` (requires Authorization header `Bearer <token>`). This will call `authService.logout` and `cartRepo.clearCart(userId)` to empty the cart — satisfying the requirement “cart is tied to a user session”.
  - Because JWT is stateless, server-side you can clear the cart on logout. If you also need to invalidate JWT immediately, you'd implement a token blocklist (not included here for brevity).
- **Placing order**: `POST /api/orders` will deduct product stock and clear cart.
- **Cart uniqueness**: `Cart.userId` is `unique: true` — only one cart per user exists.

---

# Run checklist (quick)
1. `npm install`
2. Start MongoDB (e.g. `mongod`)
3. `npm run dev`
4. Use Postman / curl:
   - Register: `POST /api/auth/register`
   - Login: `POST /api/auth/login` → get token
   - Use token for `/api/cart`, `/api/orders`, `/api/auth/logout`

---

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

    %% Relationships
    USER ||--o{ CART : "has"
    CART ||--|{ CART_ITEM : "contains"
    CART_ITEM }o--|| PRODUCT : "references"

    USER ||--o{ ORDER : "places"
    ORDER ||--|{ ORDER_ITEM : "contains"
    ORDER_ITEM }o--|| PRODUCT : "references"

    CATEGORY ||--o{ PRODUCT : "categorizes"
