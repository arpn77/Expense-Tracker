import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SIDEBAR_WIDTH, MAIN_CONTENT_WIDTH } from "../../utils/Constants";

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem("trips") || "[]");
    setTrips(savedTrips);
  }, []);

  const handleDelete = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Trips</h1>
            <Link
              to="/newtrips"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <span className="mr-2">+</span>
              Add New Trip
            </Link>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 bg-gray-50">
              <div className="font-semibold text-gray-600">Date</div>
              <div className="font-semibold text-gray-600">Destination</div>
              <div className="font-semibold text-gray-600">Source</div>
              <div className="font-semibold text-gray-600">Duration</div>
              <div className="font-semibold text-gray-600">Status</div>
              <div className="font-semibold text-gray-600">Actions</div>
            </div>

            {/* Table Body */}
            {trips.length === 0 ? (
              <div className="p-12 text-center text-gray-500 bg-gray-50/50">
                <p className="text-lg">No trips found.</p>
                <p className="text-sm mt-2">Add your first trip to get started!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {trips.map((trip) => (
                  <div
                    key={trip.id}
                    className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-gray-600">
                      {new Date(trip.fromDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-800 font-medium">
                      {trip.destination}
                    </div>
                    <div className="text-gray-600">{trip.source}</div>
                    <div className="text-gray-800">
                      {new Date(trip.fromDate).toLocaleDateString()} -{" "}
                      {new Date(trip.toDate).toLocaleDateString()}
                    </div>
                    <div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          trip.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : trip.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {trip.status}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(trip.id)}
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

export default Trips;
