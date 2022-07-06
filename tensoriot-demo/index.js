// load bcrypt package
const bcrypt = require("bcrypt");

//minimalist web framework for node
const express = require("express");

//  Load body-parser
const bodyParser = require("body-parser");

//  load JWT Token Package
const jwt = require("jsonwebtoken");

// load middleware Auth
const is_auth = require("./middelware/is-auth");

// load env variables
const env = require("dotenv").config();

// load routes
const routes = require("./routes/protected");

// load User database object
const { User, sequelize } = require("./models/user");

const path = require("path");

//create the app
const app = express();

app.use(bodyParser.json());

// Login API Method
const login = async (req, res, next) => {
  try {
    // Get Username and valid If user exists in the database
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    //  Query the database with name received
    const user = await User.findOne({ where: { username } });
    if (user == null) {
      // return invalid user if no user found with name
      res.status(400).json({ message: "Invalid Username" });
      //    exit from the method
      return;
    }
    // If valid user exists compare the passwords stored in the databse as well as recieved password
    const result = await bcrypt.compare(password, user.dataValues.password);
    if (result) {
      // send JWT Token if passwords are matched
      const token = jwt.sign({ username }, process.env.JWT_SECERET_KEY, {
        expiresIn: "1h", // expires in 1 hours
      });
      res.status(200).json({ message: "login successful", token });
    } else {
      res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    // Any other error respond with error message
    res.status(500).json({ message: error.message });
  }
};

const homePage = (req, res) => {
  return res.sendFile(path.join(__dirname, "./views/loginPage.html"));
};

app.use(express.static("./public"));
app.use(express.static("./views"));
app.get("/", homePage);
// Register Login API
app.post("/login", login);

// Authentication middle ware
app.use(is_auth);

// below route is protected with JWT Tokens
app.use("/api/", routes);

// Run Application
app.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
