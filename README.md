# Feature Estimator

A modern feature estimation tool for agile teams to plan and track project efforts. Replace your spreadsheets with a dedicated, user-friendly application for managing feature estimates, priorities, and effort tracking.

## Features

- 📝 Add and manage feature estimates
- 📊 Track effort and priorities
- 💰 Configure effort to time and cost mapping
- 📈 Generate estimation summaries and cost calculations
- 🔄 Real-time cost updates based on effort configurations
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend:**
  - Next.js 14 with App Router
  - React 18
  - TypeScript
  - Tailwind CSS
  - shadcn/ui components
  - Zustand for state management

- **Backend:**
  - Next.js API Routes (coming soon)
  - Prisma ORM (coming soon)
  - PostgreSQL database (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
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

3. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
feature-estimator/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── feature-estimator.tsx
│   └── effort-config.tsx
├── lib/                  # Utility functions and shared logic
│   ├── store/            # Zustand state management
│   │   ├── index.ts      # Store definition
│   │   └── types.ts      # TypeScript interfaces
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

### Key Components

- **FeatureEstimator**: Main interface for managing features, their priorities, and efforts
- **EffortConfiguration**: Interface for managing effort sizes and their associated costs
- **Store**: Zustand store handling state management across components

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
