import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/CustomHeader";
import Sidebar from "../components/CustomSidebar";
import { SIDEBAR_WIDTH, HEADER_HEIGHT, MAIN_CONTENT_WIDTH } from "../utils/Constants";

export const PrivateLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <Header className="fixed top-0 left-0 right-0 z-50 h-[64px]" />

      {/* Fixed Sidebar */}
      <Sidebar className="fixed left-0 top-[64px] w-[256px] h-[calc(100vh-64px)]" />

      {/* Main Content */}
      <main
        className="ml-[256px] pt-[64px] min-h-[calc(100vh-64px)]"
        style={{ width: MAIN_CONTENT_WIDTH }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
};
