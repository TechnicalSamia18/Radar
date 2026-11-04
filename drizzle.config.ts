// Config for the drizzle-kit CLI (generate / migrate / studio).
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "file:./data/radar.db",
    authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
  },
});
