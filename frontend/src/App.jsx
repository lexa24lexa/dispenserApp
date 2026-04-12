import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import TeacherDashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";

import Drawers from "./pages/Drawers";
// import Users from "./pages/Users";
// import Replenishment from "./pages/Replenishment";
// import Request from "./pages/Request";

import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";

import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Layout>
          <Routes>

            {/* public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* teacher */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute roles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />

            {/*
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["teacher"]}>
                  <Users />
                </ProtectedRoute>
              }
            />
            */}

            {/*
            <Route
              path="/replenishment"
              element={
                <ProtectedRoute roles={["teacher"]}>
                  <Replenishment />
                </ProtectedRoute>
              }
            />
            */}

            {/* shared */}
            <Route
              path="/drawers"
              element={
                <ProtectedRoute roles={["student", "teacher"]}>
                  <Drawers />
                </ProtectedRoute>
              }
            />

            {/* student */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute roles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            {/*
            <Route
              path="/request"
              element={
                <ProtectedRoute roles={["student"]}>
                  <Request />
                </ProtectedRoute>
              }
            />
            */}

          </Routes>
        </Layout>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;