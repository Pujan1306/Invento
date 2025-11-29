# Invento - Inventory Management Dashboard

A modern, full-stack inventory management system built with Next.js 14, TypeScript, and MongoDB. This application provides real-time tracking of inventory, sales, purchases, and expenses with an intuitive dashboard interface.

## 🚀 Features

- 📊 Interactive dashboard with key metrics
- 📦 Inventory management
- 🏷️ Product catalog
- 💰 Expense tracking
- 📈 Sales and purchase analytics
- 🌓 Dark/light mode support
- 📱 Responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: TailwindCSS, Radix UI
- **State Management**: React Hook Form
- **Database**: MongoDB with Mongoose
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Theming**: next-themes

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd invento
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser** to see the application in action.

## 📂 Project Structure

```
src/
├── app/                 # App router pages and API routes
│   ├── api/            # API endpoints
│   ├── inventory/      # Inventory management
│   ├── product/        # Product management
│   ├── expenses/       # Expense tracking
│   └── userSettings/   # User settings
├── components/         # Reusable UI components
├── lib/                # Utility functions
├── model/             # Database models
└── types/             # TypeScript type definitions
```

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [TailwindCSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework.
- [MongoDB with Mongoose](https://mongoosejs.com/docs/) - MongoDB object modeling for Node.js.
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🚀 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Environment Variables
Make sure to set the following environment variables in your deployment:
- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: A secure random string for NextAuth.js
- `NEXTAUTH_URL`: Your application URL (e.g., https://yourapp.vercel.app)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
