// // import React from "react";
// // import { Routes, Route } from "react-router-dom";
// // import {Login} from "../pages/Auth/Login";

// // const AuthStack: React.FC = () => {
// //   return (
// //     <Routes>
// //       <Route path="/login" element={<Login />} />
// //     </Routes>
// //   );
// // };

// // export default AuthStack;

// import React, { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { Login } from "../pages/Auth/Login";
// import HeroPage from "../pages/Auth/HeroPage/HeroPage";
// import { useLocation } from "react-router-dom";

// const AuthStack: React.FC = () => {
//   const location = useLocation();

//   useEffect(() => {
//     console.log("AuthStack rendered, current path:", location.pathname);
//   }, [location]);

//   return (
//     <Routes>
//       <Route path="/" element={<HeroPage />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default AuthStack;

import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import HeroPage from "../pages/Auth/HeroPage/HeroPage";
import AboutUs from "../pages/Auth/AboutUs/AboutUs";
import Mission from "../pages/Auth/Mission/Mission";
import Contact from "../pages/Auth/Contact/Contact";
import FAQ from "../pages/Auth/FAQ/FAQ";
import { useLocation } from "react-router-dom";

const AuthStack: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("AuthStack rendered, current path:", location.pathname);
  }, [location]);

  return (
    <Routes>
      {/* Public Landing Pages */}
      <Route path="/" element={<HeroPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/mission" element={<Mission />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/login" element={<Login />} />
      
      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AuthStack;
