# Movies.lk 🎬

A full-stack movie ticket booking platform built with React and Node.js, featuring real-time seat selection, secure payment processing via Stripe, and comprehensive admin management capabilities.

## ✨ Features

### User Features
- 🎥 Browse and search movies with detailed information
- 📅 Select show dates and timings
- 💺 Interactive seat layout with real-time availability
- 🎫 Secure ticket booking with Stripe payment integration
- 📧 Email notifications for booking confirmations
- ❤️ Add movies to favorites
- 📱 View and manage personal bookings
- 🔐 Secure authentication via Clerk

### Admin Features
- 📊 Comprehensive dashboard with booking analytics
- 🎬 Add and manage movie shows
- 📋 View all bookings and customer details
- 🏛️ Multiple hall/seat layout configurations
- ⚙️ Full CRUD operations for shows and schedules

### Technical Features
- 🎨 Modern UI with Tailwind CSS and Framer Motion animations
- 📱 Fully responsive design for mobile and desktop
- ⚡ Fast performance with Vite build tool
- 🔄 Real-time seat availability updates
- 🌐 RESTful API architecture
- 🗄️ MongoDB database for data persistence
- 📨 Automated email notifications with Nodemailer
- 🔒 Secure webhook handling for payment events

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Clerk** - Authentication and user management
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **React Player** - Video player for trailers

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **Stripe** - Payment processing
- **Clerk Express** - Authentication middleware
- **Inngest** - Background job processing
- **Nodemailer** - Email service
- **Cloudinary** - Media management
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

You'll also need accounts for:
- [Clerk](https://clerk.com/) - Authentication
- [Stripe](https://stripe.com/) - Payment processing
- [Cloudinary](https://cloudinary.com/) - Media storage (optional)
- [Inngest](https://www.inngest.com/) - Background jobs (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DilnukDeSilva/Movies.lk.git
cd Movies.lk
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Stripe Payment
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Email Configuration (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Inngest (Optional)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Admin Configuration
ADMIN_EMAIL=admin@example.com
```

Start the backend server:

```bash
# Development mode with auto-reload
npm run server

# Production mode
npm start
```

The backend server will run on `http://localhost:3000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
VITE_BASE_URL=http://localhost:3000

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# TMDB (The Movie Database) - Optional for movie data
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

- **User Interface**: `http://localhost:5173`
- **Admin Panel**: `http://localhost:5173/admin`
- **API Endpoint**: `http://localhost:3000`

## 📁 Project Structure

```
Movies.lk/
├── backend/
│   ├── configs/          # Configuration files (DB, email)
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Authentication middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── inngest/          # Background job functions
│   ├── server.js         # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── assets/       # Images and static files
│   │   ├── components/   # Reusable React components
│   │   ├── context/      # React Context (state management)
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── index.html
│   ├── vite.config.js    # Vite configuration
│   └── package.json
│
└── README.md
```

## 🎯 Key Features Explained

### Seat Layout System
The application supports multiple seat layout configurations:
- **Layout 1**: Traditional theater layout with left and right sections
- **Layout 2**: Modified theater layout
- **Layout 3-5**: Various auditorium configurations

Seat layouts are dynamically loaded based on the selected show time, with real-time availability updates.

### Payment Flow
1. User selects seats and proceeds to checkout
2. Backend creates a Stripe checkout session
3. User completes payment on Stripe
4. Stripe webhook confirms payment
5. Booking is confirmed and email is sent
6. Inngest handles background tasks (email notifications)

### Admin Dashboard
Administrators can:
- View booking statistics and revenue
- Add new movie shows with custom schedules
- Manage multiple show times per day
- Configure different hall layouts for shows
- View and export booking details

## 🔧 Available Scripts

### Backend
```bash
npm run server    # Start development server with nodemon
npm start         # Start production server
```

### Frontend
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## 🌐 Deployment

### Backend Deployment (Vercel)
The backend includes a `vercel.json` configuration for easy deployment:

```bash
cd backend
vercel --prod
```

### Frontend Deployment (Vercel)
The frontend also includes a `vercel.json` configuration:

```bash
cd frontend
vercel --prod
```

Make sure to update environment variables in your deployment platform's dashboard.

## 🔐 Environment Variables

### Required Variables

**Backend:**
- `MONGODB_URI` - MongoDB connection string
- `CLERK_SECRET_KEY` - Clerk authentication secret
- `STRIPE_SECRET_KEY` - Stripe payment secret
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `EMAIL_USER` - Email sender address
- `EMAIL_PASS` - Email app password

**Frontend:**
- `VITE_BASE_URL` - Backend API URL
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk public key

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Dilnuk De Silva**
- GitHub: [@DilnukDeSilva](https://github.com/DilnukDeSilva)

## 🙏 Acknowledgments

- [Clerk](https://clerk.com/) for authentication
- [Stripe](https://stripe.com/) for payment processing
- [Vercel](https://vercel.com/) for hosting
- [MongoDB](https://www.mongodb.com/) for database
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

For support, email support@movies.lk or open an issue in the repository.

---

Made with ❤️ by Dilnuk De Silva
