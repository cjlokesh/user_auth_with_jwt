exports.protectedApi = (req, res, next) => {
  res.status(200).json({ message: "Protected Route" });
};
