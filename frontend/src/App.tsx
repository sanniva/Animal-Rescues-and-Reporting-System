// // // src/App.tsx
// // import React from "react";
// // import { BrowserRouter as Router } from "react-router-dom";
// // import { AuthProvider } from "./context/AuthContext";
// // import MainStack from "./routes/MainStack";
// // import RootNavController from "./routes/RootNavController";

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <Router>
// //         <RootNavController />
// //       </Router>
// //     </AuthProvider>
// //   );
// // }

// // export default App;


// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import { NotificationProvider } from "./context/NotificationContext";
// import { useNotifications } from "./context/NotificationContext";
// import MainStack from "./routes/MainStack";
// import RootNavController from "./routes/RootNavController";
// import NotificationPanel from "./components/NotificationPanel/NotificationPanel";
// import NotificationPopup from "./components/NotificationPopup/NotificationPopup";

// // Separate component to use the notification hook
// const AppWithNotifications: React.FC = () => {
//   const { isNotificationPanelOpen, closeNotificationPanel } = useNotifications();
  
//   return (
//     <>
//       <RootNavController />
//       <NotificationPanel isOpen={isNotificationPanelOpen} onClose={closeNotificationPanel} />
//       <NotificationPopup />
//     </>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <NotificationProvider>
//         <Router>
//           <AppWithNotifications />
//         </Router>
//       </NotificationProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { useNotifications } from "./context/NotificationContext";
import RootNavController from "./routes/RootNavController";
import NotificationPanel from "./components/NotificationPanel/NotificationPanel";
import NotificationPopup from "./components/NotificationPopup/NotificationPopup";

const AppWithNotifications: React.FC = () => {
  const { isNotificationPanelOpen, closeNotificationPanel } = useNotifications();
  
  return (
    <>
      <RootNavController />
      <NotificationPanel isOpen={isNotificationPanelOpen} onClose={closeNotificationPanel} />
      <NotificationPopup />
    </>
  );
};

function App() {
  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <AppWithNotifications />
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}

export default App;