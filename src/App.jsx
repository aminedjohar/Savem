import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      const formattedUrl = videoUrl.trim();
      if (!formattedUrl.startsWith('http')) {
        alert('Please enter a valid YouTube video URL.');
        return;
      }

      setIsLoading(true);

      const response = await axios.get('http://localhost:5000/download', {
        params: {
          url: formattedUrl,
        },
        responseType: 'blob',
      });

      setIsLoading(false);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setIsLoading(false);
      console.error('Error downloading video:', error);
    }
  };

  return (
    <div>
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Enter YouTube Video URL"
      />
      <button onClick={handleDownload}>Download</button>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default App;
