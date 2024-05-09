import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import TimeTracker from "./pages/TimeTracker";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import ConfirmResetPassword from "./pages/ConfirmResetPassword";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Occurred</div>,
    children: [
      {
        errorElement: <div>test</div>,
        children: [
          {
            index: true,
            element: <TimeTracker />,
          },
          {
            path: "/projects",
            element: <Projects />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/reset-password",
            element: <ResetPassword />,
          },
          {
            path: "/confirm-reset-password",
            element: <ConfirmResetPassword />,
          },
        ],
      },
    ],
  },
]);
