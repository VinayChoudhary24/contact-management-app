import React from 'react';
import LineChart from '../Components/LineChart'; 
import WorldMap from '../Components/WorldMap'; 

/**
 * ChartsAndMaps component - displays a line chart and a world map with COVID-19 data.
 * @returns {JSX.Element}
 */
const ChartsAndMaps: React.FC = () => {
  return (
    <div className="overflow-auto p-4 space-y-8 md:space-y-12 lg:space-y-16">
      <div className="max-w-full">
        <LineChart />
      </div>
      <div className="max-w-full h-96 md:h-[500px] lg:h-[600px]">
        <WorldMap />
      </div>
    </div>
  );
};

export default ChartsAndMaps;