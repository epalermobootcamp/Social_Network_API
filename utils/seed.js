const connection = require("../config/connection");
const { Thoughts, Users } = require("../models");
// Import functions for seed data
const { users, thoughts } = require("./data");

// Start the seeding runtime timer
console.time("seeding");

// Creates a connection to mongodb
connection.once("open", async () => {
  // Delete the entries in the collection
  await Thoughts.deleteMany({});
  await Users.deleteMany({});

  // Empty arrays for randomly generated Thoughts and Users
  const users = [];
  const thoughts = [];

  // Wait for the users to be inserted into the database
  await Users.collection.insertMany(users);

  // Wait for the Thoughts array to be inserted into the database
  await Thoughts.collection.insertMany(thoughts);

  // Log out a pretty table for users and Thoughts, excluding the excessively long text property
  console.table(users);
  console.table(thoughts, ["published", "users", "_id"]);
  console.timeEnd("seeding");
  process.exit(0);
});
