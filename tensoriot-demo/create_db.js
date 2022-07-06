const bcrypt = require("bcrypt");
const { User, sequelize } = require("./models/user");

const saltRounds = 12;
const myPlaintextPassword = "user1@tensoriot.com";

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (!err) {
    sequelize.sync().then(() => {
      User.create({
        username: "lokesh",
        password: hash,
      })
        .then(async (data) => {
          console.log(data);
          const users = await User.findAll();
          console.log("User name:", users[0].dataValues.username); // true
          console.log("User password:", users[0].dataValues.password); // true
        })
        .catch((err) => console.error("At Error:", err));
    });
  }
});
