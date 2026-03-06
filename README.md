# NextInn - Hotel Booking Project

NextInn is a full-stack hotel booking application that allows users to browse and book rooms, and provides an admin dashboard for managing bookings, rooms, and users.

## Tech Stack

**Frontend:**

- React
- Redux for state management
- React Router for routing
- Axios for API requests
- Tailwind CSS for styling
- Framer Motion for animations

**Backend:**

- Node.js
- Express.js for the server
- MongoDB with Mongoose for the database
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads

## Features

- User authentication (login, logout, register)
- Browse and filter rooms
- Book rooms
- User dashboard to view bookings
- Admin dashboard for managing rooms, bookings, and users
- Secure image uploads to Cloudinary

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/NextInn.git
    ```
2.  **Install backend dependencies**
    ```sh
    cd NextInn/backend
    npm install
    ```
3.  **Install frontend dependencies**
    ```sh
    cd ../frontend
    npm install
    ```

### Configuration

1.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=8000
    MONGODB_URI=<your_mongodb_uri>
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=<your_access_token_secret>
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
    REFRESH_TOKEN_EXPIRY=10d
    CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
    CLOUDINARY_API_KEY=<your_cloudinary_api_key>
    CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
    ```

### Running the Application

1.  **Start the backend server**
    ```sh
    cd backend
    npm run dev
    ```
2.  **Start the frontend development server**
    ```sh
    cd frontend
    npm run dev
    ```

## Folder Structure

```
NextInn/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routers/
│   │   └── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components-support/
    │   ├── hooks/
    │   ├── redux/
    │   ├── userUI/
    │   └── util/
    ├── package.json
    └── vite.config.js
```

## API Endpoints

### Auth Routes (`/api/auth`)
- `POST /signup` - User signup
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /update-pass` - Update user password
- `POST /me` - Verify user session
- `POST /refresh` - Refresh user session
- `POST /admin-login` - Admin login
- `POST /admin-logout` - Admin logout
- `POST /admin-me` - Verify admin session
- `POST /admin-refresh` - Refresh admin session
- `POST /admin-verify` - Send OTP to admin
- `POST /admin-verify-otp` - Verify admin OTP
- `POST /super-admin-login` - Super Admin login

### Admin Routes (`/api/admin`) (Super Admin only)
- `GET /` - Get all admins
- `POST /add` - Add new admin
- `PATCH /:id` - Update admin
- `DELETE /:id` - Delete admin
- `GET /logs` - Get all logs

### Booking Routes (`/api/booking`)
- `POST /create` - Create a new booking
- `GET /get-by-user` - Get bookings by user
- `GET /check-availability` - Check room availability
- `GET /all-booking` - Get all bookings (Admin)
- `POST /update-status` - Update booking status (Admin)
- `POST /update-cancel` - Cancel booking (Admin)

### Dashboard Routes (`/api/dashboard`) (Admin only)
- `GET /` - Get dashboard data

### Review Routes (`/api/review`)
- `GET /check-token/:tokenValue` - Check review token
- `POST /submit-review` - Submit a new review
- `GET /all-reviews` - Get all reviews (Admin)
- `PUT /update-status` - Update review status (Admin)
- `PATCH /toggle-featured` - Toggle featured review (Admin)
- `DELETE /delete/:reviewId` - Delete a review (Admin)

### Rooms Category Routes (`/api/rooms-category`)
- `GET /get-all` - Get all room categories
- `PUT /update` - Update a room category
- `POST /get-room` - Get a room category by id

### Rooms Management Routes (`/api/rooms`) (Admin only)
- `POST /add-room` - Add a new room
- `GET /all` - Get all rooms
- `DELETE /delete/:roomId` - Delete a room
- `PUT /update/:roomId` - Update a room

## Database Schema

### User
| Field | Type | Description |
|---|---|---|
| `firstname` | String | User's first name |
| `lastname` | String | User's last name |
| `email` | String | User's email address |
| `mobile` | String | User's mobile number |
| `city` | String | User's city |
| `password` | String | Hashed password |
| `profile_photo` | String | URL to profile photo |

### Admin
| Field | Type | Description |
|---|---|---|
| `name` | String | Admin's name |
| `email` | String | Admin's email address |
| `password` | String | Hashed password |
| `role` | String | `admin` or `superadmin` |

### RoomCategory
| Field | Type | Description |
|---|---|---|
| `categoryId` | String | Unique category ID |
| `name` | String | Category name |
| `location` | String | Location of the room |
| `price` | Number | Price per night |
| `info` | String | Short information |
| `description` | String | Detailed description |
| `roomCapacity` | Object | Details about room capacity |
| `addonServicesCharges`| Object | Charges for additional services |
| `bannerImg` | String | URL to banner image |
| `roomImages` | Array | Array of URLs to room images |
| `features` | Array | Array of room features |
| `amenities` | Array | Array of room amenities |

### Room
| Field | Type | Description |
|---|---|---|
| `roomNumber` | String | Unique room number |
| `floor` | Number | Floor number |
| `category` | ObjectId | Reference to RoomCategory |
| `status` | String | `available`, `maintenance`, `checked-in` |
| `cleaning_status` | String | `clean`, `dirty`, `in-progress` |
| `current_guest` | ObjectId | Reference to User |
| `current_booking` | ObjectId | Reference to Booking |

### Booking
| Field | Type | Description |
|---|---|---|
| `assignedRooms` | Array | Array of references to Room |
| `bookingId` | String | Unique booking ID |
| `category` | ObjectId | Reference to RoomCategory |
| `user` | ObjectId | Reference to User |
| `checkIn` | Date | Check-in date |
| `checkOut` | Date | Check-out date |
| `bookingStatus` | String | `confirmed`, `cancelled`, `checked-in`, `checked-out` |
| `paymentStatus` | String | `pending`, `paid`, `failed`, `refunded` |
| `totalAmount` | Number | Total booking amount |
| `guestDetails` | Object | Details about guests |
| `priceBreakdown` | Object | Breakdown of the total price |

### Review
| Field | Type | Description |
|---|---|---|
| `booking` | ObjectId | Reference to Booking |
| `user` | ObjectId | Reference to User |
| `category` | ObjectId | Reference to RoomCategory |
| `rating` | Number | Rating from 1 to 5 |
| `comment` | String | Review comment |
| `status` | String | `pending`, `submitted`, `approved`, `rejected` |
| `isFeatured`| Boolean | Whether the review is featured |

### OTP
| Field | Type | Description |
|---|---|---|
| `email` | String | Email address |
| `otp` | String | One-time password |

### RefreshToken
| Field | Type | Description |
|---|---|---|
| `userId` | ObjectId | Reference to User or Admin |
| `refreshToken` | String | Refresh token |
| `tokenUser`| String | `user` or `admin` |
| `expiresAt` | Date | Token expiry date |

### Log
| Field | Type | Description |
|---|---|---|
| `admin` | ObjectId | Reference to Admin |
| `module` | String | Module where the action occurred |
| `actionType` | String | Type of action |
| `description` | String | Description of the action |

## Deployment

The application is deployed and can be accessed at the following URL:

[Live Application] (https://next-inn.vercel.app/)
