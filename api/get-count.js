import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "counter.json");

export default async function handler(req, res) {
  try {
    let count = 2032;

    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, "utf8");
      count = JSON.parse(data).count;
    }

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to load count" });
  }
}
