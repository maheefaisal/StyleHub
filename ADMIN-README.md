# StyleHub Admin Dashboard

This admin dashboard provides a complete interface for managing your StyleHub e-commerce website, allowing you to create, update, delete, and manage products through an intuitive web interface.

## Features

- **Product Management**: Add, edit, delete, and view products in your store
- **User Authentication**: Secure admin access with JWT authentication
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Comfortable viewing in any lighting condition

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- SQLite or PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/stylehub"
   JWT_SECRET="your-secret-key-here"
   ```
   
   For SQLite (simpler setup):
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-secret-key-here"
   ```

4. Run the setup script to initialize the database:
   ```
   npm run setup:admin
   ```
   
   This will:
   - Generate the Prisma client
   - Run database migrations
   - Seed the database with an admin user and sample products

### Starting the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/admin/login
   ```

3. Log in with the default admin credentials:
   - Email: `admin@stylehub.com`
   - Password: `admin123`

## Admin Dashboard Usage

### Product Management

1. **View Products**: Navigate to the Products section to see all products in your store.
2. **Add Products**: Click the "Add Product" button to create new products.
3. **Edit Products**: Click the three dots menu on a product and select "Edit".
4. **Delete Products**: Click the three dots menu on a product and select "Delete".

### Database Management

For direct database access and management:

```
npm run prisma:studio
```

This opens Prisma Studio at http://localhost:5555, providing a visual interface to your database.

## Security Notes

- Change the default admin password after first login
- In production, always use strong, unique JWT_SECRET values
- Consider adding rate limiting for login attempts

## Customization

- You can modify the Prisma schema in `prisma/schema.prisma` to match your needs
- Add additional fields to the Product model as required
- Customize the dashboard UI in the corresponding React components 