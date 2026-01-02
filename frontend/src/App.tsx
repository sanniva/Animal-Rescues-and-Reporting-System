// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainStack from "./routes/MainStack";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainStack />
      </Router>
    </AuthProvider>
  );
}

export default App;