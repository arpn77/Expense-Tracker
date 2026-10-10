import React, { useState, useEffect } from "react";

const Approval = () => {
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [pendingTrips, setPendingTrips] = useState([]);

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    const trips = JSON.parse(localStorage.getItem("trips") || "[]");

    setPendingExpenses(
      expenses.filter((expense) => expense.status === "Pending")
    );
    setPendingTrips(trips.filter((trip) => trip.status === "Pending"));
  }, []);

  const handleApprove = (type, id) => {
    if (type === "expense") {
      const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
      const updatedExpenses = expenses.map((expense) =>
        expense.id === id ? { ...expense, status: "Approved" } : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setPendingExpenses(
        updatedExpenses.filter((expense) => expense.status === "Pending")
      );
    } else {
      const trips = JSON.parse(localStorage.getItem("trips") || "[]");
      const updatedTrips = trips.map((trip) =>
        trip.id === id ? { ...trip, status: "Approved" } : trip
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setPendingTrips(updatedTrips.filter((trip) => trip.status === "Pending"));
    }
  };

  const handleReject = (type, id) => {
    if (type === "expense") {
      const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
      const updatedExpenses = expenses.map((expense) =>
        expense.id === id ? { ...expense, status: "Rejected" } : expense
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      setPendingExpenses(
        updatedExpenses.filter((expense) => expense.status === "Pending")
      );
    } else {
      const trips = JSON.parse(localStorage.getItem("trips") || "[]");
      const updatedTrips = trips.map((trip) =>
        trip.id === id ? { ...trip, status: "Rejected" } : trip
      );
      localStorage.setItem("trips", JSON.stringify(updatedTrips));
      setPendingTrips(updatedTrips.filter((trip) => trip.status === "Pending"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Approvals</h1>
            <p className="text-gray-600 mt-2">
              Manage pending expenses and trips
            </p>
          </div>

          {/* Pending Expenses Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Pending Expenses
              </h2>
            </div>

            {pendingExpenses.length === 0 ? (
              <div className="p-12 text-center text-gray-500 bg-gray-50/50">
                <p className="text-lg">No pending expenses to approve</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingExpenses.map((expense) => (
                  <div key={expense.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {expense.details}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          Amount: ${expense.amount} • Category:{" "}
                          {expense.category}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Date: {new Date(expense.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleReject("expense", expense.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove("expense", expense.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Trips Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">
                Pending Trips
              </h2>
            </div>

            {pendingTrips.length === 0 ? (
              <div className="p-12 text-center text-gray-500 bg-gray-50/50">
                <p className="text-lg">No pending trips to approve</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {pendingTrips.map((trip) => (
                  <div key={trip.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {trip.destination}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          From: {trip.source}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(trip.fromDate).toLocaleDateString()} -{" "}
                          {new Date(trip.toDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleReject("trip", trip.id)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove("trip", trip.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
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

export default Approval;
