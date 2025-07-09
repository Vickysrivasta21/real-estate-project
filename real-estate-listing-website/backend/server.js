const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/properties",require("./routes/propertydetails"))//property details show karne ke liye
app.use("/api/propertydetails",require("./routes/propertydetailsdynamic"))//koi specific property show karna kr liye
app.use("/api/rentprop",require("./routes/rentprop"))//for rental property details
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
