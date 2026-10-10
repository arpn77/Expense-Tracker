import React from "react";

const Header = () => {
  const username = localStorage.getItem("username");
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="flex justify-between items-center h-full px-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">Expense Tracker</div>

        {username ? (
          <div className="flex items-center space-x-4">
            {/* Display username instead of profile picture */}
            <span className="text-gray-600 font-medium">{username}</span>
          </div>
        ) : (
          <div className="flex space-x-4">
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
              Login
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
