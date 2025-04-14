# Beer Store App

A proof of concept for a beer store application that demonstrates modern web development practices and optimizations.

## 🚀 Live Demo

Visit the deployed application at [Vercel URL]

## 🛠 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management
- **Firebase** - Backend and data storage
- **Vitest** - Testing framework

## ✨ Features & Technical Decisions

### Core Features
- Order management system with paid/unpaid filters
- Real-time stock updates
- Responsive design optimized for mobile

### Code Quality
- TypeScript for type safety
- Component-based architecture
- Custom hooks for business logic
- Unit tests with Vitest
- ESLint & Prettier configuration

### Performance Optimizations
- Next.js App Router for better routing and performance
- Image optimization with next/image
- Component lazy loading
- Efficient state management with Zustand
- Firebase SDK optimization

### UI/UX Enhancements
- Loading states with custom animations
- Shimmer effects on hover
- Smooth transitions between states
- Reusable components (Tabs, Rate, ProductCard)
- Responsive layout with Tailwind CSS

## 🏃‍♂️ Running the Project

1. Clone the repository
```bash
git clone https://github.com/thelookus/lucas-calvino-frontend-cometa.git
cd lucas-calvino-frontend-cometa
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your Firebase configuration
```

4. Run development server
```bash
npm run dev
```

5. Run tests
```bash
npm test
```

## 📝 Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # Reusable components
├── store/        # Zustand store configurations
├── services/     # External service integrations
├── types/        # TypeScript type definitions
├── utils/        # Helper functions
└── __tests__/    # Test files
```

## 🎯 Future Improvements

- Implement user authentication
- Add cart functionality
- Enhance test coverage
- Add more animations and transitions
- Implement error boundaries

## 👨‍💻 Author

Lucas Calviño

## Environment Variables

1. Create a file named `.env.local` in the root of your project.
2. Add the following variables to the `.env.local` file:

```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

[Leer en Español](README.es.md)
