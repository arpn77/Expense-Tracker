import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const HomeScreen = () => {
  const { user } = useAuth();
  const [pendingTrips, setPendingTrips] = useState([]);
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("trips") || "[]");
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");

    setPendingTrips(trips.filter((trip) => trip.status === "Pending"));
    setPendingExpenses(
      expenses.filter((expense) => expense.status === "Pending")
    );
  }, [user]);

  return (
    <div className="p-6 justify-center items-center">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {username || "User"} !👋
        </h1>
        <p className="text-gray-600">Here's your expense tracking overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Trips Section */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-100">
          <div className="bg-primary-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <span className="mr-2">✈️</span>
              Pending Trips
            </h2>
          </div>

          <div className="p-6">
            {pendingTrips.length > 0 ? (
              <ul className="space-y-4">
                {pendingTrips.map((trip) => (
                  <li
                    key={trip.id}
                    className="bg-primary-50 border border-primary-100 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-700">
                          {trip.destination}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          From: {trip.source}
                        </p>
                      </div>
                      <span className="bg-primary-100 text-primary-700 text-sm py-1 px-3 rounded-full">
                        Pending
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      {new Date(trip.fromDate).toLocaleDateString()} -{" "}
                      {new Date(trip.toDate).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 italic">No pending trips</p>
              </div>
            )}
          </div>
        </section>

        {/* Pending Expenses Section */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-100">
          <div className="bg-primary-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <span className="mr-2">💰</span>
              Pending Expenses
            </h2>
          </div>

          <div className="p-6">
            {pendingExpenses.length > 0 ? (
              <ul className="space-y-4">
                {pendingExpenses.map((expense) => (
                  <li
                    key={expense.id}
                    className="bg-primary-50 border border-primary-100 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-700">
                          {expense.details}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Category: {expense.category}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="bg-primary-100 text-primary-700 text-sm py-1 px-3 rounded-full">
                          Pending
                        </span>
                        <span className="text-lg font-semibold text-primary-700 mt-2">
                          ${expense.amount}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 italic">No pending expenses</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeScreen;
