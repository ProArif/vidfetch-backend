import express from "express";
import cors from "cors";
import { YTDlpWrapExtended } from "yt-dlp-wrap-extended";

const app = express();
app.use(cors());
app.use(express.json());

const ytdlp = new YTDlpWrapExtended();

app.post("/api/getvideo", async (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).json({ error: "No URL provided" });

  try {
    const downloadUrl = await ytdlp.getDownloadUrl(videoUrl, { format: "best" });
    res.json({ downloadUrl });
  } catch (error) {
    console.error("yt-dlp error:", error);
    res.status(500).json({ error: "Failed to get video link" });
  }
});

app.get("/", (req, res) => {
  res.send("✅ VidFetch backend is running! Use POST /api/getvideo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
