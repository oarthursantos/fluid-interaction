import { CreateUserDialog } from "./components/CreateUserDialog";
import { Home } from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register-user",
      element: <CreateUserDialog />,
    },
  ]);
  return <RouterProvider router={router} />;
}
