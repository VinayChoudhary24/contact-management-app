import React from 'react';
import LineChart from '../Components/LineChart';
import WorldMap from '../Components/WorldMap';

const ChartsAndMaps: React.FC = () => {
  return (
    <div className="overflow-auto">
      <LineChart />
      <WorldMap />
    </div>
  );
};

export default ChartsAndMaps;