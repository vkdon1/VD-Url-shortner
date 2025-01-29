const express = require("express");
const shortenerRoutes = require("./routes/shortener.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Use the shortenerRoutes here
app.use("/", shortenerRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
