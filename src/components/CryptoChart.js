import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useWebSocket from "../utils/useWebSocket";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CryptoChart = ({ symbol, interval }) => {
  const { chartData, error } = useWebSocket(symbol, interval);

  const data = {
    labels: chartData.map((item) => new Date(item.time).toLocaleTimeString()),
    datasets: [
      {
        label: `${symbol.toUpperCase()} Candlestick`,
        data: chartData.map((item) => item.close),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  // Display error message if any WebSocket issue occurs
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-8">
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
