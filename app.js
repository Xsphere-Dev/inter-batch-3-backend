const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routers");

app.use("/api", routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
