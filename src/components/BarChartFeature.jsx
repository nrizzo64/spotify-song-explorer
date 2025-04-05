import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartFeature = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return null;

  // Calculate averages
  const features = ['energy', 'valence', 'danceability'];
  const averages = features.map((feature) => {
    const sum = tracks.reduce((acc, t) => acc + (t.audio_features?.[feature] || 0), 0);
    return {
      feature,
      value: parseFloat((sum / tracks.length).toFixed(2)),
    };
  });

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={averages}>
          <XAxis dataKey="feature" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartFeature;
