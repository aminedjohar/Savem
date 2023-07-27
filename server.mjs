import express from 'express';
import cors from 'cors';
import ytdl from 'ytdl-core';

const app = express();
const port = 5000;

app.use(cors());

app.get('/download', async (req, res) => {
    const url = req.query.url;

    if (!ytdl.validateURL(url)) {
        res.status(400).json({ error: 'Invalid YouTube URL' });
        return;
    }

    try {
        const videoInfo = await ytdl.getInfo(url);
        const title = videoInfo.videoDetails.title;

        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);

        ytdl(url, {
            quality: 'highest',
        }).pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred during video download' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
