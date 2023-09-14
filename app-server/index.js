const egg = require("egg");

egg.startCluster(
  {
    baseDir: "/var/task/app-server",
    port: process.env.PORT || 7001, // default to 7001
  },
  () => {
    console.log("Egg started on port " + (process.env.PORT || 7001));
  }
);
