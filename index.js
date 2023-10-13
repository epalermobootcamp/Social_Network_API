const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// const mongoose = require("mongoose");

// Wrap Mongoose around local connection to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/aggregateDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Export connection
// module.exports = mongoose.connection;

app.listen(PORT, () => {
  console.log(`Connecting to port ${PORT}!`);
});
