import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MediumBlog from "./components/MediumBlog";
import QuizApp from "./components/QuizApp";
import BudgetApp from "./components/BudgetApp";
import StockData from "./components/StockData";

const App = () => {
  return (
    <Router>
      <div className="App min-h-screen bg-orange-200 text-white">
        <nav className="p-4 bg-gray-800">
          <Link className="mr-4" to="/">
            Finance App
          </Link>
          <Link className="mr-4" to="/blog">
            Blog API
          </Link>
          <Link className="mr-4" to="/quiz">
            Quiz App
          </Link>
          <Link className="mr-4" to="/stocks">
            Stock Data
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen flex flex-col items-center">
                <div className="max-w-3xl w-full mt-6">
                  <BudgetApp />
                </div>
              </div>
            }
          />
          <Route
            path="/blog"
            element={
              <div className="min-h-screen flex justify-center items-center">
                <div className="max-w-3xl w-full">
                  <MediumBlog />
                </div>
              </div>
            }
          />
          <Route
            path="/quiz"
            element={
              <div className="min-h-screen flex justify-center items-center">
                <div className="max-w-3xl w-full">
                  <QuizApp />
                </div>
              </div>
            }
          />
          <Route
            path="/stocks"
            element={
              <div className="min-h-screen flex justify-center items-center">
                <div className="max-w-3xl w-full">
                  <StockData />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
