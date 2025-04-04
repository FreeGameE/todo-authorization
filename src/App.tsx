import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import SiderBar from "./components/mainApp/SiderBar/SiderBar";
import TodoListPage from "./components/mainApp/TodoListPage/TodoListPage";
import ProfilePage from "./components/mainApp/ProfilePage/ProfilePage";
import AuthPage from "./components/auth/AuthPage/AuthPage";
import { useEffect } from "react";
import { loginSuccess } from "./store/authSlice";
import PrivateRoute from "./components/auth/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/auth/AuthPage/PublicRoute/PublicRoute";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");

    if (storedAccessToken && storedRefreshToken && !accessToken) {
      dispatch(
        loginSuccess({
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        })
      );
    }
  }, [dispatch, accessToken]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register-success"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {accessToken ? (
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout>
                  <SiderBar />
                  <Layout
                    style={{
                      backgroundColor: "rgb(74, 137, 200)",
                      minHeight: "100vh",
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<TodoListPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                  </Layout>
                </Layout>
              </PrivateRoute>
            }
          />
        ) : (
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Navigate to="/" />
              </PrivateRoute>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
