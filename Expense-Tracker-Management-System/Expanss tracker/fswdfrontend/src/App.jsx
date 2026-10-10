// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/CustomHeader";
// import Sidebar from "./components/CustomSidebar";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import { publicRoutes, privateRoutes } from "./router";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       <Sidebar />
//       <div className="ml-64 flex flex-col">
//         <Header />
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// };

// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (user) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// const AppRoutes = () => {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       {/* Redirect root to login if not authenticated */}
//       <Route
//         path="/"
//         element={user ? <Navigate to="/" /> : <Navigate to="/login" />}
//       />

//       {/* Public Routes */}
//       {publicRoutes.map(({ path, component: Component }) => (
//         <Route
//           key={path}
//           path={path}
//           element={
//             <PublicRoute>
//               <Component />
//             </PublicRoute>
//           }
//         />
//       ))}

//       {/* Protected Routes */}
//       {privateRoutes.map(({ path, component: Component }) => (
//         <Route
//           key={path}
//           path={path}
//           element={
//             <ProtectedRoute>
//               <Component />
//             </ProtectedRoute>
//           }
//         />
//       ))}
//     </Routes>
//   );
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         {/* <div className="flex min-h-screen"> */}
//           <AppRoutes />
//         {/* </div> */}
//       </AuthProvider>
//     </BrowserRouter>
//   );
// };

// export default App;

import React from "react";
import Router from "./router";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
