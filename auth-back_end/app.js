require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");

app.use(cors());
app.use(express.json());

app.use("/api/users",router)

// mongoose
//   .connect(process.env.DB)
//   .then(() => console.log("DB is connected now..."));

  try {
    mongoose.connect(process.env.DB);
    console.log("your DB is now connected...")
  } catch (error) {
    console.log("could'nt connect to DB...")
    
  }
const port = process.env.port || 9000;
app.listen(port, () => console.log("server is Running..."));
