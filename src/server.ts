import { app } from "./app";
import { connect } from "mongoose";

connect(process.env.DATABASE_URL ?? "").then(() => {
  console.log("Connected to database");
}).catch(err => console.error('Something went wrong', err));

app.listen(3000, () => console.log("Server running on port 3000"));
