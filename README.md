# Next.js Turso Starter

This repository is a starter template for building a Next.js application with Turso and Drizzle ORM.

<img width="1200" alt="Next.js Starter" src="https://github.com/user-attachments/assets/b78fd54e-574b-43b9-8f8f-943d14722e64" />

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftursodatabase%2Fnextjs-turso-starter&integration-ids=oac_axiehHAX1Zn7QiwRSzDD2j7J&products=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22tursocloud%22%2C%22productSlug%22%3A%22database%22%2C%22protocol%22%3A%22storage%22%2C%22group%22%3A%22%22%7D%5D)

## Stack

- Next.js 15
- App Router
- Server Actions
- Drizzle ORM
- Turso Database
- Todo CRUD
- TypeScript
- Tailwind CSS

## Local Development

1. Clone this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

   Fill in your Turso database credentials:

   ```
   TURSO_DATABASE_URL=your_turso_database_url
   TURSO_AUTH_TOKEN=your_turso_auth_token
   ```

4. Set up your database:

   ```bash
   npm run db:generate
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Management

This project uses Drizzle ORM for database operations. Here are the available commands:

- `npm run db:generate` - Generate migration files from schema changes
- `npm run db:push` - Push schema changes directly to the database (use with caution)
- `npm run db:migrate` - Run migrations against the database
- `npm run db:studio` - Open the Drizzle Studio for database management

## Need Help?

1. Open an issue on GitHub
2. Submit a Pull Request to improve this starter
3. [Join us on Discord](https://tur.so/discord)
