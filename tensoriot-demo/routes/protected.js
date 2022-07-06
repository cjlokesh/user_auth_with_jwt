const { protectedApi } = require("../controllers/protected");
const { Router } = require("express");
const router = Router();

// router.get("/protect", (req, res, next) => {
//   res.json({ message: "success" });
// });

router.get("/protect", protectedApi);

module.exports = router;
