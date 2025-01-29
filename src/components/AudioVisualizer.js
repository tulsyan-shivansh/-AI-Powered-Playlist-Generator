import React, { useEffect, useRef } from 'react';
import { Typography } from '@mui/material'; // Import Typography

const AudioVisualizer = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const drawWaveform = () => {
            const width = canvas.width;
            const height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#1DB954'; // Spotify green
            ctx.beginPath();

            for (let i = 0; i < width; i++) {
                const y = Math.sin(i * 0.05) * (height / 4) + height / 2;
                ctx.lineTo(i, y);
            }

            ctx.stroke();
            requestAnimationFrame(drawWaveform);
        };

        drawWaveform();
    }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Audio Visualization
            </Typography>
            <canvas ref={canvasRef} width={500} height={200}></canvas>
        </div>
    );
};

export default AudioVisualizer;