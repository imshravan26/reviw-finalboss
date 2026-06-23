import "dotenv/config";
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { env } from "./env";

export const db: NeonHttpDatabase = drizzle(env.DATABASE_URL);
export * from "drizzle-orm";
export default db;
