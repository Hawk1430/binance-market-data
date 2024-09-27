import { useEffect, useState } from "react";

const useWebSocket = (symbol, interval) => {
  const [chartData, setChartData] = useState(() => {
    const storedData = localStorage.getItem(`${symbol}_${interval}_data`);
    return storedData ? JSON.parse(storedData) : [];
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      try {
        const wsUrl = `wss://fstream.binance.com:9443/ws/${symbol}@kline_${interval}`;
        console.log("Connecting to WebSocket URL:", wsUrl);

        // Open WebSocket connection
        socket = new WebSocket(wsUrl);

        // On message received from the WebSocket
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const candlestick = {
            time: data.k.t,
            open: data.k.o,
            high: data.k.h,
            low: data.k.l,
            close: data.k.c,
          };

          setChartData((prevData) => {
            const updatedData = [...prevData.slice(-49), candlestick]; // Keep 50 items max
            localStorage.setItem(
              `${symbol}_${interval}_data`,
              JSON.stringify(updatedData)
            );
            return updatedData;
          });
        };

        // On WebSocket  error
        socket.onerror = (errorEvent) => {
          // Properly handle WebSocket errors
          console.error("WebSocket error:", errorEvent.message || errorEvent);
          setError(
            "WebSocket connection failed: " +
              (errorEvent.message || "Unknown error")
          );
        };

        // On WebSocket close
        socket.onclose = () => {
          console.log("WebSocket closed. Reconnecting...");
          setTimeout(connectWebSocket, 3000); // Reconnect after 3 seconds
        };
      } catch (error) {
        // Log if there's a connection issue
        console.error("Failed to create WebSocket connection:", error);
        setError("WebSocket connection failed: " + error.message);
      }
    };

    // Connect WebSocket
    connectWebSocket();

    // Cleanup WebSocket on component unmount or when symbol/interval changes
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [symbol, interval]);

  return { chartData, error };
};

export default useWebSocket;
