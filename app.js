const express = require("express");
const app = express();
const routes = require("./routers");

const port = 3000;

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
