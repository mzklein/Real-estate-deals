// src/App.jsx
import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Broker from "./pages/Broker.jsx";
import Manager from "./pages/Manager.jsx";
import Office from "./pages/Office.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import { useAuthState } from "./useAuthState.js";

export default function App() {
  const { user, loading } = useAuthState();
  if (loading) return <div>Loading…</div>;

  return (
    <div style={{ padding: 16 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/broker">Broker</Link>
        <Link to="/manager">Manager</Link>
        <Link to="/office">Office</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/broker" element={<Broker />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/office" element={<Office />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}