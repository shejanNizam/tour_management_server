import mongoose from "mongoose";
import app from "./app";
import { configs } from "./app/config";

async function main() {
  try {
    await mongoose.connect(configs.database_url as string);

    app.listen(configs.port, () => {
      console.log(`Tour Management Server is running on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
