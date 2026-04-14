import React from "react";
import { useAuth } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const RootNavController: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <MainStack /> : <AuthStack />;
};

export default RootNavController;