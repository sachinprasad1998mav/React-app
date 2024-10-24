import React, { useState } from "react";

const QuizApp = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
      answer: "Harper Lee",
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Jupiter",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption("");
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption("");
    setShowResult(false);
  };

  return (
    <div className="quiz-app max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Quiz App
      </h2>
      {!showResult ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-xl font-semibold text-gray-800 mb-4">
              {questions[currentQuestion].question}
            </p>
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                  className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={`option-${index}`}
                  className="text-lg text-gray-700 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-4">
            Your Score: {score}
          </h3>
          <button
            onClick={handleRestart}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
