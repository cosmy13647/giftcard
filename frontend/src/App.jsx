import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WalletPage from './pages/WalletPage.jsx';
import TransactionsPage from './pages/TransactionsPage.jsx';
import GiftCardUpload from './pages/GiftCardUpload.jsx';
import AdminVerify from './pages/AdminVerify.jsx';
import MyCards from './pages/MyCards.jsx';
import Marketplace from './pages/Marketplace.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<div>Gift Card Details (Coming Soon)</div>} />

          {/* User Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload-giftcard"
            element={
              <ProtectedRoute>
                <GiftCardUpload />
              </ProtectedRoute>
            }
          />

          {/* User My Cards Route */}
          <Route
            path="/my-cards"
            element={
              <ProtectedRoute>
                <MyCards />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/verify"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminVerify />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
