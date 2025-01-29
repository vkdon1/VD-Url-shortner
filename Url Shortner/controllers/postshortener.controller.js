const crypto = require("crypto");
const { loadLinks, saveLinks } = require("../models/shortener.model");

const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();
    return res.render("index", { links, host: req.hostname });
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).send("Internal server error");
  }
};

// Define the postURLShortener function
const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

    const links = await loadLinks();

    if (links[finalShortCode]) {
      return res
        .status(400)
        .send("Short code already exists. Please choose another.");
    }

    links[finalShortCode] = url;

    await saveLinks(links);
    return res.redirect("/");
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).send("Internal server error");
  }
};

// Define the redirectToShortLink function
const redirectToShortLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occurred");

    return res.redirect(links[shortCode]);
  } catch (err) {
    console.error("Error details:", err);
    return res.status(500).send("Internal server error");
  }
};

// Export the functions
module.exports = { getShortenerPage, postURLShortener, redirectToShortLink };
