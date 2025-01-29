const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const DATA_FILE = path.join("Data", "links.json");

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading links:", error);
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  try {
    await writeFile(DATA_FILE, JSON.stringify(links, null, 2)); // Pretty print for easier debugging
  } catch (error) {
    console.error("Error saving links:", error);
  }
};

module.exports = { loadLinks, saveLinks };
