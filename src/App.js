import React, { useState, useEffect } from "react";
import CryptoChart from "./components/CryptoChart";
import CryptoSelector from "./components/CryptoSelector";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState("ethusdt");
  const [interval, setInterval] = useState("1m");

  // Load saved preferences from localStorage
  useEffect(() => {
    const savedSymbol = localStorage.getItem("selectedSymbol");
    const savedInterval = localStorage.getItem("selectedInterval");
    if (savedSymbol) setSelectedSymbol(savedSymbol);
    if (savedInterval) setInterval(savedInterval);
  }, []);

  const handleSymbolChange = (newSymbol) => {
    setSelectedSymbol(newSymbol);
    localStorage.setItem("selectedSymbol", newSymbol);
  };

  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    localStorage.setItem("selectedInterval", newInterval);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold mb-6">
        Binance Market Data
      </h1>

      <CryptoSelector
        selectedSymbol={selectedSymbol}
        onSymbolChange={handleSymbolChange}
        selectedInterval={interval}
        onIntervalChange={handleIntervalChange}
      />

      <CryptoChart symbol={selectedSymbol} interval={interval} />
    </div>
  );
}

export default App;
