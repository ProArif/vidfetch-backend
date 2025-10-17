import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/getvideo", (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).json({ error: "No URL provided" });

  exec(`python3 -m yt_dlp -f best -g ${videoUrl}`, (error, stdout, stderr) => {
  if (error) {
    console.error(stderr);
    return res.status(500).json({ error: "Failed to get video link" });
  }
  res.json({ downloadUrl: stdout.trim() });
});

});

// Optional: root route to test server
app.get("/", (req, res) => {
  res.send("✅ VidFetch backend is running! Use POST /api/getvideo");
});

// Dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
