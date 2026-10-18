import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const dbUrl = process.env.BETTER_AUTH_DB_URL || "";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

let client: MongoClient;
if (!globalThis._mongoClient) {
  globalThis._mongoClient = new MongoClient(dbUrl || "mongodb://localhost:27017/bazardor");
}
client = globalThis._mongoClient;

const db = client.db();

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [
    "https://*.vercel.app",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.NEXT_PUBLIC_BETTER_AUTH_URL ? [process.env.NEXT_PUBLIC_BETTER_AUTH_URL] : []),
  ],
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});