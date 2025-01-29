const { Router } = require("express");
const {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
} = require("../controllers/postshortener.controller");

const router = Router();

router.get("/", getShortenerPage);
router.post("/", postURLShortener);
router.get("/:shortCode", redirectToShortLink);

// Correct CommonJS export
module.exports = router;
