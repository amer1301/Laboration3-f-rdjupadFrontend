import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/profile",
                element: (
                <ProtectedRoute><MyProfile /></ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default router;