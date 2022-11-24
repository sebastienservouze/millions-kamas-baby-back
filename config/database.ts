import { ConnectionOptions, connect } from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(config.MONGO_URI, options);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;