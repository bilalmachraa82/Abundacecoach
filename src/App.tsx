import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { useSetupStore } from './stores/setupStore';
import { AuthProvider } from './components/auth/AuthProvider';
import { ThemeProvider } from './components/ThemeProvider';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import Budget from './pages/Budget';
import Grabovoi from './pages/Grabovoi';
import Wellbeing from './pages/Wellbeing';
import AICoach from './pages/AICoach';
import Settings from './pages/Settings';
import Setup from './pages/Setup';

export default function App() {
  const { isInitialized } = useSetupStore();

  if (!isInitialized) {
    return (
      <Router>
        <Routes>
          <Route path="/setup" element={<Setup />} />
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route
              path="/"
              element={
                <Layout showPeriodSelector>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/transactions"
              element={
                <Layout>
                  <Transactions />
                </Layout>
              }
            />
            <Route
              path="/analytics"
              element={
                <Layout showPeriodSelector>
                  <Analytics />
                </Layout>
              }
            />
            <Route
              path="/goals"
              element={
                <Layout>
                  <Goals />
                </Layout>
              }
            />
            <Route
              path="/budget"
              element={
                <Layout>
                  <Budget />
                </Layout>
              }
            />
            <Route
              path="/grabovoi"
              element={
                <Layout>
                  <Grabovoi />
                </Layout>
              }
            />
            <Route
              path="/wellbeing"
              element={
                <Layout>
                  <Wellbeing />
                </Layout>
              }
            />
            <Route
              path="/ai-coach"
              element={
                <Layout>
                  <AICoach />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
          </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}
