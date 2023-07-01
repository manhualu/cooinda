const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/deeznutz", (req, res) => {
  res.json({ yourMum: "nuts" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
