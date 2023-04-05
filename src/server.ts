import { app } from "./app";
import { connect } from "mongoose";

connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@petersen.faehj.mongodb.net/menu_test?retryWrites=true&w=majority`
).then(() => {
  console.log("Connected to database");
}).catch(err => console.error('Something went wrong', err));

app.listen(3000, () => console.log("Server running on port 3000"));
