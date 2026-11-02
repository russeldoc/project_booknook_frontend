import { MongoClient } from "mongodb";

// Reuse one client during development hot reloads.
const globalForMongo = globalThis;

const client =
  globalForMongo._booknookMongoClient ?? new MongoClient(process.env.MONGODB_URI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._booknookMongoClient = client;
}

export const db = client.db(process.env.MONGODB_DB || "booknook");
