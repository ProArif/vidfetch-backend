import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/getvideo", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  // Use yt-dlp directly via Python
  exec(`yt-dlp -f best -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr || err);
      return res.status(500).json({ error: "Failed to get video link" });
    }
    res.json({ downloadUrl: stdout.trim() });
  });
});

app.get("/", (req, res) => res.send("✅ Server running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
