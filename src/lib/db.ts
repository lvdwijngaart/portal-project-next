// src/lib/db.ts
import postgres from "postgres"

export const sql = postgres(process.env.DATABASE_URL as string, {
  // any options you want, e.g. ssl defaults
})
