require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./routes"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
