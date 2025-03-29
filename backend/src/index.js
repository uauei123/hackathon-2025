const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const carbonRoutes = require("./routes/carbonRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// base route
app.get("/", (req, res) => {
  res.send("Backend funzionante!");
});

app.use("/api", carbonRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});