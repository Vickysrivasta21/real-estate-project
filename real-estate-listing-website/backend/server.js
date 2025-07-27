const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();
connectDB();
const allowedOrigins = [
  "https://your-frontend-domain.up.railway.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/properties",require("./routes/propertydetails"))//property details show karne ke liye
app.use("/api/propertydetails",require("./routes/propertydetailsdynamic"))//koi specific property show karna kr liye
app.use("/api/rentprop",require("./routes/rentprop"))//for rental property details
app.use("/api/rentpropdetails",require("./routes/rentpropdynamic"))//for dynmaic rent prop details
app.use("/api/emptyplotdetails",require("./routes/emptyplots"))//for details of empty plots
app.use("/api/plotdetailsdynamic",require("./routes/emptyplotsdynamic"))
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0' ,() => {
  console.log(`Server running on port ${PORT} `);
});
