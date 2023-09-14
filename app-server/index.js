/*
 * @Description:
 * @Author: Devin
 * @Date: 2023-09-14 13:00:36
 */
const egg = require("egg");

egg.startCluster(
  {
    baseDir: "/var/task",
    port: process.env.PORT || 7001, // default to 7001
  },
  () => {
    console.log("Egg started on port " + (process.env.PORT || 7001));
  }
);
