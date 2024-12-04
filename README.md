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
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL database

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
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
   This step is required before running any other commands.

3. Set up the database:

   First, ensure PostgreSQL is running and create a new database:
   ```bash
   # Create the database
   createdb feature_estimator

   # If you need to create a new user
   createuser -s postgres

   # Set password for postgres user
   psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

   # Grant privileges
   psql -c "GRANT ALL PRIVILEGES ON DATABASE feature_estimator TO postgres;"
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   The default .env.example uses:
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/feature_estimator"
   ```
   Update this if you're using different credentials.

5. Initialize the database:
   ```bash
   # Set up database (runs migrations, generates client, and seeds data)
   pnpm db:setup
   ```

   This will create default effort configurations:
   - Extra Small: 3 days at $1000/day
   - Small: 5 days at $1000/day
   - Medium: 10 days at $1000/day
   - Large: 20 days at $1000/day

6. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

### Database Troubleshooting

If you encounter permission issues:

1. Check PostgreSQL connection:
   ```bash
   psql -U postgres -d feature_estimator
   ```
   If this fails, verify your PostgreSQL installation and user permissions.

2. Common fixes:
   ```bash
   # Create postgres superuser if needed
   createuser -s postgres

   # Set password
   psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"

   # Grant privileges
   psql -c "GRANT ALL PRIVILEGES ON DATABASE feature_estimator TO postgres;"
   ```

3. If using a different user/password:
   - Update your .env file accordingly
   - Example: `DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/feature_estimator"`

## Database Management

### Available Database Commands

```bash
# Run database migrations
pnpm prisma:migrate

# Generate Prisma client
pnpm prisma:generate

# Seed database with initial data
pnpm prisma:seed

# Open Prisma Studio (database GUI)
pnpm prisma:studio

# Run all database setup steps
pnpm db:setup
```

### Development Workflow

When making changes to the Prisma schema:

1. Update `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name <migration-name>` to create a new migration
3. Run `pnpm prisma:generate` to update the Prisma Client

## Project Structure

```
feature-estimator/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
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
├── prisma/               # Database schema and migrations
│   ├── schema.prisma     # Database schema
│   ├── migrations/       # Database migrations
│   └── seed.ts           # Seed script
└── public/               # Static assets
```

### Key Components

- **FeatureEstimator**: Main interface for managing features, their priorities, and efforts
- **EffortConfiguration**: Interface for managing effort sizes and their associated costs
- **Store**: Zustand store handling state management across components
- **API Routes**: RESTful endpoints for CRUD operations

### Available Scripts

- `pnpm install` - Install dependencies (required first)
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prisma:studio` - Open Prisma Studio
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:seed` - Seed the database
- `pnpm db:setup` - Run all database setup steps

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
