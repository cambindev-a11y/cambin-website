import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "counter.json");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let count = 2032; // default starting count

    // If counter.json exists, load it
    if (fs.existsSync(FILE_PATH)) {
      const data = fs.readFileSync(FILE_PATH, "utf8");
      count = JSON.parse(data).count;
    }

    // Increment count
    count++;

    // Save updated count
    fs.writeFileSync(FILE_PATH, JSON.stringify({ count }));

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: "Counter failed", details: err.message });
  }
}
