/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

async function main() {
  try {
    await mongoose.connect(configs.database_url as string);

    console.log("Connected to DB!");

    server = app.listen(configs.port, () => {
      console.log(`Tour Management Server is running on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await main();
  await seedSuperAdmin();
})();

process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved... Server shutting down..");

  if (server) {
    process.exit(1);
  }
  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal recieved... Server shutting down..");

  if (server) {
    process.exit(1);
  }
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejecttion detected... Server shutting down..", err);

  if (server) {
    process.exit(1);
  }
  process.exit(1);
});
// Unhandler rejection error for testing
// Promise.reject(new Error("I forgot to catch this promise"));

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception detected... Server shutting down..", err);

  if (server) {
    process.exit(1);
  }
  process.exit(1);
});

// Uncaught Exception Error for testing
// throw new Error("I forgot to handle this local erro");

/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */
