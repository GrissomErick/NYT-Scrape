const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);
require("./routes/scrape")(app);

const PORT = process.env.PORT || process.argv[2] || 8080;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
