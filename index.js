const express = require("express"),
  connectDB = require("./config/db"),
  routes = require('./routes/index'),
  routesAPI = require('./routes/url');

const app = express();

connectDB()

app.use(express.json({ extended: false }));

app.use("/", routes)
app.use("/api/url", routesAPI)

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
