const egg = require("egg");

egg.startCluster(
  {
    baseDir: path.join(__dirname, ".."),
    port: process.env.PORT || 7001, // default to 7001
  },
  () => {
    console.log("Egg started on port " + (process.env.PORT || 7001));
  }
);
