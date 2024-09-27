import React from "react";

const CryptoSelector = ({
  selectedSymbol,
  onSymbolChange,
  selectedInterval,
  onIntervalChange,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Cryptocurrency selection */}
      <div>
        <label className="font-bold">Select Cryptocurrency:</label>
        <select
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedSymbol}
          onChange={(e) => onSymbolChange(e.target.value)}
        >
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="dotusdt">DOT/USDT</option>
        </select>
      </div>

      {/* Time Interval Selection */}
      <div>
        <label className="font-bold">Select Time Interval:</label>
        <select
          className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={selectedInterval}
          onChange={(e) => onIntervalChange(e.target.value)}
        >
          <option value="1m">1 Minute</option>
          <option value="3m">3 Minutes</option>
          <option value="5m">5 Minutes</option>
        </select>
      </div>
    </div>
  );
};

export default CryptoSelector;
