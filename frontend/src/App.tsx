// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainStack from "./routes/MainStack";
import RootNavController from "./routes/RootNavController";

function App() {
  return (
    <AuthProvider>
      <Router>
        <RootNavController />
      </Router>
    </AuthProvider>
  );
}

export default App;