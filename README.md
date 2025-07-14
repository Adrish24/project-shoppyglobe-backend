# ShoppyGlobe Backend API

A comprehensive e-commerce backend API built with Node.js, Express.js, and MongoDB. This project provides a complete backend solution for an online shopping platform with user authentication, product management, and shopping cart functionality.

## Repository

[GitHub Repository](https://github.com/Adrish24/project-shoppyglobe-backend)

## 🚀 Features

- **User Authentication**: Registration and login with JWT tokens
- **Product Management**: Fetch all products or specific product by ID
- **Shopping Cart**: Add, update, remove, and view cart items
- **Security**: Password hashing with bcrypt and JWT-based authentication
- **Database**: MongoDB with Mongoose ODM
- **Logging**: Request logging middleware
- **Error Handling**: Comprehensive error handling across all endpoints

## 📁 Project Structure

```
shoppyglobe-backend/
├── controllers/
│   ├── auth.controller.js      # Authentication controllers
│   ├── cart.controller.js      # Cart management controllers
│   └── product.controller.js   # Product management controllers
├── db/
│   └── connect.js              # Database connection configuration
├── middlewares/
│   ├── auth.js                 # JWT authentication middleware
│   └── logger.js               # Request logging middleware
├── models/
│   ├── Cart.js                 # Cart data model
│   ├── Product.js              # Product data model
│   └── User.js                 # User data model
├── routes/
│   ├── auth.routes.js          # Authentication routes
│   ├── cart.routes.js          # Cart routes
│   └── products.routes.js      # Product routes
├── utils/
│   ├── fakeProducts.js         # Sample product data
│   ├── generateToken.js        # JWT token generation utility
│   └── verifyToken.js          # JWT token verification utility
├── package.json                # Dependencies and scripts
└── server.js                   # Main application entry point
```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Environment Variables**: dotenv
- **Development**: nodemon for auto-restart

## 📦 Dependencies

### Production Dependencies
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **jsonwebtoken**: JWT implementation
- **bcrypt**: Password hashing library
- **dotenv**: Environment variables loader

### Development Dependencies
- **nodemon**: Development server with auto-restart

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shoppyglobe-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=8080
   MONGODB_URI=mongodb://localhost:27017/shoppyglobe
   JWT_SECRET=your-jwt-secret-key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

The server will run on `http://localhost:8080` (or the port specified in your `.env` file).

## 🗄️ Database Models

### User Model
```javascript
{
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}
```

### Product Model
```javascript
{
  title: String,
  price: Number,
  description: String,
  stock: Number,
  category: String,
  rating: Number
}
```

### Cart Model
```javascript
{
  userId: { type: ObjectId, ref: "User", required: true },
  products: [{
    productId: { type: ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 }
  }]
}
```

## 🔐 API Endpoints

### Authentication Routes (`/auth`)

#### Register User
- **POST** `/auth/register`
- **Body**: `{ username, password }`
- **Response**: Success message or error
- **Status Codes**: 201 (Created), 400 (Bad Request), 500 (Server Error)

#### Login User
- **POST** `/auth/login`
- **Body**: `{ username, password }`
- **Response**: User data and JWT token
- **Status Codes**: 200 (OK), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

### Product Routes (`/products`)

#### Get All Products
- **GET** `/products`
- **Response**: Array of all products
- **Status Codes**: 200 (OK), 404 (Not Found), 500 (Server Error)

#### Get Product by ID
- **GET** `/products/:id`
- **Response**: Single product object
- **Status Codes**: 200 (OK), 404 (Not Found), 500 (Server Error)

### Cart Routes (`/cart`) - Protected Routes

All cart routes require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

#### Add to Cart
- **POST** `/cart`
- **Body**: `{ productId, quantity }`
- **Response**: Success message
- **Status Codes**: 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error)

#### Get Cart Items
- **GET** `/cart`
- **Response**: User's cart with products
- **Status Codes**: 200 (OK), 404 (Not Found), 500 (Server Error)

#### Update Cart Item
- **PUT** `/cart/:productId`
- **Body**: `{ quantity }`
- **Response**: Success message
- **Status Codes**: 200 (OK), 404 (Not Found), 500 (Server Error)

#### Remove Cart Item
- **DELETE** `/cart/:productId`
- **Response**: Success message
- **Status Codes**: 200 (OK), 500 (Server Error)

## 🔒 Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 10
- No plain text passwords are stored in the database

### JWT Authentication
- JWT tokens are generated upon successful login
- Tokens expire after 1 hour (configurable)
- Protected routes verify token validity before processing requests

### Input Validation
- Required field validation for all endpoints
- Proper error messages for missing or invalid data

## 🔧 Middleware

### Logger Middleware
- Logs all HTTP requests with method, URL, and status code
- Automatically applied to all routes

### Authentication Middleware
- Validates JWT tokens for protected routes
- Extracts user ID from token and attaches to request object
- Returns 401 for invalid or missing tokens

## 🚀 Development Features

### Auto-restart
- Uses nodemon for automatic server restart during development
- Configured in package.json scripts

### Error Handling
- Comprehensive try-catch blocks in all controllers
- Consistent error response format
- Proper HTTP status codes for different scenarios

### Code Organization
- Modular architecture with separate controllers, models, and routes
- ES6 modules for clean imports/exports
- Utility functions for common operations

## 📊 Data Flow

1. **User Registration/Login**: User credentials → Authentication → JWT Token
2. **Product Browsing**: Client request → Product controller → Database → Response
3. **Cart Management**: JWT Token → Auth middleware → Cart controller → Database → Response

## 🔧 Utility Functions

### Token Generation (`generateToken.js`)
- Creates JWT tokens with user ID payload
- Configurable expiration time
- Error handling for token creation failures

### Token Verification (`verifyToken.js`)
- Validates JWT tokens
- Extracts user ID from valid tokens
- Throws errors for invalid tokens

### Sample Data (`fakeProducts.js`)
- Contains sample product data for testing
- Can be imported into database for development

## 🚀 Getting Started for Development

1. **Database Setup**: Ensure MongoDB is running locally or provide remote connection string
2. **Environment Configuration**: Set up `.env` file with required variables
3. **Data Import**: Uncomment the data import function in `server.js` to populate sample products
4. **Testing**: Use tools like Postman or ThunderClient to test API endpoints

## 📝 API Usage Examples

### Register a User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepassword"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "password": "securepassword"}'
```

### Get All Products
```bash
curl http://localhost:3000/products
```

### Add to Cart (with authentication)
```bash
curl -X POST http://localhost:3000/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{"productId": "product_id_here", "quantity": 2}'
```

## 🔍 Error Handling

The API returns consistent error responses:
```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

