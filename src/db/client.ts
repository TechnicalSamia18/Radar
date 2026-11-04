// One shared database connection for the whole server (never import this from a client component).
// Locally DATABASE_URL defaults to a SQLite file; in production it points at
// Turso (libsql://…) and DATABASE_AUTH_TOKEN holds the token.
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "file:./data/radar.db";

const client = createClient({
  url,
  authToken: process.env.DATABASE_AUTH_TOKEN || undefined,
});

export const db = drizzle(client, { schema });
