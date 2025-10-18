import express from 'express';
import cors from 'cors';
import { YTDlpWrap } from 'yt-dlp-wrap';

const app = express();
app.use(cors());
app.use(express.json());

const ytdlp = new YTDlpWrap(); // no manual chmod needed

app.post('/api/getvideo', async (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).json({ error: 'No URL provided' });

  try {
    // Get video info JSON
    const info = await ytdlp.execPromise(videoUrl, ['-j']);
    const json = JSON.parse(info);

    if (!json?.url) {
      return res.status(500).json({ error: 'Could not retrieve video URL' });
    }

    res.json({ downloadUrl: json.url });
  } catch (error) {
    console.error('yt-dlp error:', error);
    res.status(500).json({ error: 'Failed to get video link' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ VidFetch backend is running! Use POST /api/getvideo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
