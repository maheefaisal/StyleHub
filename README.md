# StyleHub 🎨

A modern, full-stack web application for managing and showcasing styles, built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- Modern and responsive UI with Tailwind CSS
- Full-stack application with Next.js and TypeScript
- Secure authentication system
- Database integration with Prisma and MongoDB
- Beautiful animations with Framer Motion
- Data visualization with Recharts
- Admin dashboard for content management
- Type-safe API routes with Zod validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/stylehub.git
cd stylehub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Set up admin user:
```bash
npm run setup:admin
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Prisma](https://www.prisma.io/) - Database ORM
- [MongoDB](https://www.mongodb.com/) - Database
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Recharts](https://recharts.org/) - Composable charting library
- [Zod](https://zod.dev/) - TypeScript-first schema validation

## 📁 Project Structure

```
stylehub/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript types
├── prisma/           # Database schema and migrations
├── public/           # Static assets
└── images/           # Project images
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:seed` - Seed database
- `npm run setup:admin` - Set up admin user

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS team for the beautiful styling system
- All contributors who have helped shape this project
