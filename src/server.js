const express = require("express");
const app = express();

app.use(express.static("src/web"))

app.listen(7600, function () {
  console.log("Server Started http://localhost:7600");
});


