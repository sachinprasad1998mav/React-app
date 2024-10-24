// src/components/StockCarousel.jsx
import React, { useState } from "react";

const StockCarousel = () => {
  const [stocks] = useState([
    { symbol: "IBM", price: "143.25" },
    { symbol: "AAPL", price: "148.80" },
    { symbol: "GOOGL", price: "2754.00" },
    { symbol: "MSFT", price: "299.35" },
    { symbol: "AMZN", price: "3344.94" },
    { symbol: "TSLA", price: "800.03" },
    { symbol: "FB", price: "340.59" },
    { symbol: "NFLX", price: "590.65" },
    { symbol: "NVDA", price: "225.45" },
    { symbol: "ADBE", price: "620.45" },
    { symbol: "INTC", price: "53.18" },
    { symbol: "ORCL", price: "92.84" },
    { symbol: "CSCO", price: "56.20" },
    { symbol: "PYPL", price: "270.45" },
    { symbol: "AMD", price: "103.65" },
  ]);

  return (
    <div className="bg-blue-700 text-white p-4 overflow-hidden">
      <div
        className="whitespace-nowrap flex"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: "scroll-left 30s linear infinite",
        }}
      >
        {stocks.map((stock, index) => (
          <div key={index} className="inline-block mx-8">
            <span className="font-bold">{stock.symbol}: </span>
            <span>{stock.price}</span>
          </div>
        ))}

        {stocks.map((stock, index) => (
          <div key={index + stocks.length} className="inline-block mx-8">
            <span className="font-bold">{stock.symbol}: </span>
            <span>{stock.price}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default StockCarousel;

// src/components/StockCarousel.jsx
