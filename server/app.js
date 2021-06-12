const express = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4500;

app.use(cors());
require("./action")(app);

app.listen(port, function () {
  console.log(`Server listening to port:: ${port}`);
});
