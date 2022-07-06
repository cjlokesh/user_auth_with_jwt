const jwt = require("jsonwebtoken");
const path = require("path");
module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    //throw error saying the req is not authenticated
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    res.status(500).json({ message: error.message });
    return;
  }
  /**if Authorization was passed as part of req header
   * then extract the token
   */
  const token = authHeader.split(" ")[1];
  //variable to store the decoded token
  let decodedToken;
  // try to decode token
  try {
    //verify and decode the token
    decodedToken = jwt.verify(token, process.env.JWT_SECERET_KEY);
  } catch (err) {
    console.log(err);
  }
  //if the token was invalid
  if (!decodedToken) {
    //throw error saying the req is not authenticated
    const error = new Error("Not authenticated.");
    // error.statusCode = HttpStatus.UNAUTHORIZED;
    console.log(error);
  }
  req.body.username = decodedToken.username;
  next();
};
