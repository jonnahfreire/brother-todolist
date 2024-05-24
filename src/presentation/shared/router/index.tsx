import { createBrowserRouter } from "react-router-dom";
import { accessControllLoader } from "./loaders";
import App from "../..";
import { LoginPage } from "../../features/auth/pages/login-page";
import { RegisterPage } from "../../features/auth/pages/register-page";
import { Home } from "../../features/home";
import { TaskProvider } from "../contexts/task";
import { AuthProvider } from "../contexts/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <AuthProvider>
        <TaskProvider>
          <Home />
        </TaskProvider>
      </AuthProvider>
    ),
    loader: accessControllLoader,
    shouldRevalidate: () => true,
  },
]);
