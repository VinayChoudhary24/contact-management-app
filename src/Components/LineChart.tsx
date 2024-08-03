import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  TimeScale,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { showLoader, hideLoader } from '../Slices/loaderSlice';

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define Chart.js options with responsive styling
const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'COVID-19 Historical Data',
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'month',
      },
      title: {
        display: true,
        text: 'Date',
        font: {
          size: 14,
        },
      },
    },
    y: {
      title: {
        display: true,
        text: 'Count',
        font: {
          size: 14,
        },
      },
    },
  },
};

// Function to fetch graph data from the API
const fetchGraphData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data;
};

/**
 * LineChart component - displays a line chart with COVID-19 historical data.
 * @returns {JSX.Element | null}
 */
const LineChart: React.FC = () => {
  const dispatch = useDispatch();
  
  // Show loader when component mounts
  useEffect(() => {
    dispatch(showLoader());
  }, [dispatch]);

  // Fetch graph data and manage loading state
  const { data, error, isLoading } = useQuery('graphData', fetchGraphData, {
    onSettled: () => dispatch(hideLoader()),
    onError: () => dispatch(hideLoader()),
  });

  // Show loader while data is being loaded
  useEffect(() => {
    if (isLoading) {
      dispatch(showLoader());
    }
  }, [isLoading, dispatch]);

  // Render nothing if data is still loading
  if (isLoading || !data) {
    return null;
  }

  // Show error message if data failed to load
  if (error) {
    return <div>Error loading data</div>;
  }

  // Map API data to chart labels and datasets
  const labels = Object.keys(data.cases).map((date) => new Date(date));
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Cases',
        data: Object.values(data.cases),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Recovered',
        data: Object.values(data.recovered),
        borderColor: 'rgba(75, 192, 75, 1)',
        backgroundColor: 'rgba(75, 192, 75, 0.2)',
        fill: true,
      },
      {
        label: 'Deaths',
        data: Object.values(data.deaths),
        borderColor: 'rgba(192, 75, 75, 1)',
        backgroundColor: 'rgba(192, 75, 75, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="mb-4 w-full max-w-full h-96">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;