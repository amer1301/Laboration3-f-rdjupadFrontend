import { createBrowserRouter } from "react-router-dom";
import Layout from './components/Layout';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyProfile from "./pages/MyProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PostListPage from "./pages/PostsListPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import AdminPostsPage from './pages/AdminPostsPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: '/posts', element: <PostListPage /> },
            { path: '/posts/:id', element: <PostDetailsPage /> },
                {
                    path: '/admin',
                    element: (
                        <ProtectedRoute>
                            <AdminPostsPage />
                        </ProtectedRoute>
                    ),
            },
            {
                path: "/profile",
                element: (
                <ProtectedRoute><MyProfile /></ProtectedRoute>
                ),
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default router;