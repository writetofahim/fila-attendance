import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Main from "./layout/Main";
import Attendance from "./pages/attendance/Attendance";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Attendance />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
