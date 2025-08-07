const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const regionRoutes = require("./routes/regionRoutes");

const cors = require("cors");


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: ["http://localhost:5173","https://hdosexpence.spaadvisor.in"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
));


app.use("/api/auth", authRoutes);
app.use("/api/region", regionRoutes);
app.use("/api/expense", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
