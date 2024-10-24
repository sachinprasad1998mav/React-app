import React, { useState } from "react";

const BudgetApp = () => {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

  const balance = totalIncome - totalExpense;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newTransaction = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);

    setAmount("");
    setDescription("");
  };

  const handleDelete = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="budget-app max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Budget App
      </h2>
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-green-600">Income</h3>
          <p className="text-2xl text-black font-bold">
            ${totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-red-600">Expenses</h3>
          <p className="text-2xl text-black font-bold">
            ${totalExpense.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">Balance</h3>
          <p className="text-2xl text-black font-bold">${balance.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter description"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out"
        >
          Add Transaction
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Transaction History
      </h3>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
          >
            <span className="font-semibold text-gray-800">
              {transaction.description}
            </span>
            <span
              className={`${
                transaction.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              } font-bold`}
            >
              ${transaction.amount.toFixed(2)}
            </span>
            <button
              onClick={() => handleDelete(transaction.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetApp;
