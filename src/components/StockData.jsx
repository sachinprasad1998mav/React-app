import React, { useEffect, useState } from "react";
import axios from "axios";

const StockData = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const stockSymbols = [
    "MSFT",
    "AAPL",
    "GOOGL",
    "AMZN",
    "TSLA",
    "NFLX",
    "FB",
    "NVDA",
    "BABA",
    "INTC",
  ];
  const API_KEY = process.env.REACT_APP_STOCK_API_KEY;

  useEffect(() => {
    const fetchAllStockData = async () => {
      try {
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const lastFetched = localStorage.getItem("lastFetched");
        let allStockData =
          JSON.parse(localStorage.getItem("allStockData")) || {};

        if (
          lastFetched &&
          now - new Date(lastFetched) < oneDay &&
          Object.keys(allStockData).length > 0
        ) {
          setStockData(Object.values(allStockData));
          setLoading(false);
          return;
        }

        const fetchedData = await Promise.all(
          stockSymbols.map(async (symbol) => {
            const response = await axios.get(
              `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
            );
            if (response.data["Time Series (Daily)"]) {
              const latestData =
                response.data["Time Series (Daily)"][
                  Object.keys(response.data["Time Series (Daily)"])[0]
                ];
              return { symbol, ...latestData };
            } else {
              throw new Error(`API response error for ${symbol}`);
            }
          })
        );

        allStockData = {};
        fetchedData.forEach((data) => {
          allStockData[data.symbol] = data;
        });

        localStorage.setItem("allStockData", JSON.stringify(allStockData));
        localStorage.setItem("lastFetched", new Date().toISOString());
        setStockData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setLoading(false);
      }
    };

    fetchAllStockData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-3xl font-bold mb-4 text-gray-800">Stock Update</h3>
      {loading ? (
        <p className="text-gray-600">Loading stock data...</p>
      ) : stockData.length > 0 ? (
        stockData.map((data) => (
          <div key={data.symbol} className="mb-6">
            <h4 className="text-2xl font-semibold text-gray-800">
              {data.symbol}
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-700">
                  Open:
                </span>
                <span className="text-xl font-bold text-green-600">
                  ${data["1. open"]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-700">
                  High:
                </span>
                <span className="text-xl font-bold text-green-600">
                  ${data["2. high"]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-700">
                  Low:
                </span>
                <span className="text-xl font-bold text-red-600">
                  ${data["3. low"]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-700">
                  Close:
                </span>
                <span className="text-xl font-bold text-gray-800">
                  ${data["4. close"]}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-semibold text-gray-700">
                  Latest Price:
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ${data["4. close"]}
                </span>
              </div>
            </div>
            <hr className="my-4" />
          </div>
        ))
      ) : (
        <p className="text-gray-600">No stock data available.</p>
      )}
    </div>
  );
};

export default StockData;
