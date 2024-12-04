# Feature Estimator

A modern feature estimation tool for agile teams to plan and track project efforts. Replace your spreadsheets with a dedicated, user-friendly application for managing feature estimates, priorities, and effort tracking.

## Features

- 📝 Add and manage feature estimates
- 📊 Track effort and priorities
- 💰 Configure effort to time and cost mapping
- 📈 Generate estimation summaries
- 👥 Team collaboration capabilities
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend:**
  - Next.js 14 with App Router
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Zustand for state management
  - React Query for data fetching

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL database

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/blakejarryd/feature-estimator.git
   cd feature-estimator
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your database configuration.

4. Initialize the database:
   ```bash
   pnpm prisma migrate dev
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## Development

### Project Structure

```
feature-estimator/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication related pages
│   └── (dashboard)/       # Main application pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── features/         # Feature-specific components
├── lib/                  # Utility functions and shared logic
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm prisma studio` - Open Prisma Studio

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
