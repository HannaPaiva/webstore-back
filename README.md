
# Webstore Backend

This is the backend for the Webstore application, built with **Express**, **Prisma**, **TypeScript**, and **PostgreSQL**.

## 🚀 Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd webstore_back
   ```

2. **Install dependencies:**
   
   ```bash
   npm install
   ```

3. **Set Node.js version:**

   Make sure you're using **Node.js v22.14.0**. You can manage your Node versions with [nvm](https://github.com/nvm-sh/nvm):

   ```bash
   nvm install 22.14.0
   nvm use 22.14.0
   ```

4. **Create a `.env` file** in the root directory with the following variables:

   ```env
   # API
   API_PORT=3000

   # PostgreSQL Configuration
   POSTGRES_USER=webstore
   POSTGRES_PASSWORD=w3b5t0r32025!@
   POSTGRES_DB=webstore
   DATABASE_URL="postgresql://webstore:w3b5t0r32025!@@localhost:5433/webstore?schema=public"
   ```

   > 🔧 **Note:** The default API runs on port `3000`. You can change this by modifying the `API_PORT` value in your `.env` file.

## 🐘 Running PostgreSQL with Docker

Make sure Docker is installed, then start the database container:

```bash
docker compose up -d
```

## 🔄 Prisma Setup

### 1. Push existing schema to the database:

```bash
npx prisma db push
```

### 2. Run seed script (optional):

```bash
npx prisma db seed
```

## 🛠️ Creating a New Migration

If you've changed your Prisma schema (`prisma/schema.prisma`):

```bash
npx prisma migrate dev --name your_migration_name
```

## 🏃 Running the App

### In development:

```bash
npm run dev
```

### In production:

```bash
npm run build
npm start
```

## 📄 API Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:3000/swagger
```

> This documentation is generated using **Swagger** and includes details for all available API endpoints.
