const egg = require("egg");
const path = require("path");

egg.startCluster(
  {
    baseDir: path.join(__dirname, "../app-server"),
    port: process.env.PORT || 7001, // default to 7001
  },
  () => {
    console.log("Egg started on port " + (process.env.PORT || 7001));
  }
);
