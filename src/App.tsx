import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Router from "./router/router";
import "./styles/App.scss"; // Global styles

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="safe-area">
          <Router />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
