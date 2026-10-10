import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(savedExpenses);
  }, []);

  const handleDelete = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6">
      <div className="max-w-7xl mx-auto"> {/* Center container */}
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
            <Link
              to="/newexpense"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <span className="mr-2">+</span>
              Add New Expense
            </Link>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50">
              <div className="font-semibold text-gray-600">Date</div>
              <div className="font-semibold text-gray-600">Details</div>
              <div className="font-semibold text-gray-600">Category</div>
              <div className="font-semibold text-gray-600">Amount</div>
              <div className="font-semibold text-gray-600">Status</div>
              <div className="font-semibold text-gray-600">Actions</div>
            </div>

            {/* Table Body */}
            {expenses.length === 0 ? (
              <div className="p-12 text-center text-gray-500 bg-gray-50/50">
                <p className="text-lg">No expenses found.</p>
                <p className="text-sm mt-2">Add your first expense to get started!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <div 
                    key={expense.id} 
                    className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-gray-600">{new Date(expense.date).toLocaleDateString()}</div>
                    <div className="text-gray-800 font-medium">{expense.details}</div>
                    <div className="text-gray-600">{expense.category}</div>
                    <div className="text-gray-800 font-medium">${expense.amount}</div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        expense.status === 'Approved' 
                          ? 'bg-green-100 text-green-800'
                          : expense.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {expense.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
