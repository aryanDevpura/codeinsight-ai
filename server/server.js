require("dotenv").config();
const express = require("express");
const cors = require("cors");
const reviewRoutes = require("./src/routes/review.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", reviewRoutes);

app.get("/", (req, res) => {
  res.send("CodeInsight AI Server is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
