const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client"));

// LISTEN
app.listen(port, () => {
    console.log(`Todo app listening on port ${port}`);
  });