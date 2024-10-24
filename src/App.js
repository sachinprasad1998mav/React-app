import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StockCarousel from "./components/StockCarousel";
import MediumBlog from "./components/MediumBlog";
import QuizApp from "./components/QuizApp";
import BudgetApp from "./components/BudgetApp";

const App = () => {
  return (
    <Router>
      <div className="App min-h-screen">
        <nav className="p-4 bg-gray-800 text-white">
          <Link className="mr-4" to="/">
            Home
          </Link>
          <Link className="mr-4" to="/blog">
            Blog API
          </Link>
          <Link className="mr-4" to="/quiz">
            Quiz App
          </Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="bg-gray-900 min-h-screen flex justify-center items-center">
                <div className="max-w-3xl w-full">
                  <BudgetApp />
                </div>
              </div>
            }
          />
          <Route path="/blog" element={<MediumBlog />} />
          <Route
            path="/quiz"
            element={
              <div className="bg-gray-900 min-h-screen flex justify-center items-center">
                <div className="max-w-3xl w-full">
                  <QuizApp />
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
