import express from 'express';
import cors from 'cors';
import youtubedl from 'youtube-dl-exec';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/getvideo', async (req, res) => {
  const videoUrl = req.body.url;
  if (!videoUrl) return res.status(400).json({ error: 'No URL provided' });

  try {
    // Fetch the best format direct URL
    const info = await youtubedl(videoUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true
    });

    if (!info?.url) {
      return res.status(500).json({ error: 'Could not retrieve video URL' });
    }

    res.json({ downloadUrl: info.url });
  } catch (error) {
    console.error('yt-dlp error:', error);
    res.status(500).json({ error: 'Failed to get video link' });
  }
});

// Root route for testing
app.get('/', (req, res) => {
  res.send('✅ VidFetch backend is running! Use POST /api/getvideo');
});

// Dynamic port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
