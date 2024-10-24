import React from "react";
import StockCarousel from "./components/StockCarousel";
import MediumBlog from "./components/MediumBlog";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <StockCarousel />
      <MediumBlog></MediumBlog>
    </div>
  );
}

export default App;
