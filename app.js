const express = require("express");
const UserRegister = require("./router/userAuth");

const app = express();
app.use(express.json());
app.use("/register", UserRegister);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
