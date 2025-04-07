import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Flex, Layout, Typography } from "antd";
import SiderBar from "./components/mainApp/SiderBar/SiderBar";
import TodoListPage from "./components/mainApp/TodoListPage/TodoListPage";
import ProfilePage from "./components/mainApp/ProfilePage/ProfilePage";
import AuthPage from "./components/auth/AuthPage/AuthPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/auth/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute/PublicRoute";
import { logoutUser, refreshAccessToken } from "./api/authApi";
import { authStatusChange } from "./store/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getTokens = async () => {
    setLoading(true);
    if (localStorage.getItem("refreshToken")) {
      try {
        const response = await refreshAccessToken();
        console.log(response);
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        dispatch(authStatusChange(true));
      } catch (error: any) {
        console.error("Ошибка запроса:", error);
        if (error.response?.status === 401) {
          logoutUser();
        }
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("refreshToken")) {
      getTokens();
    }
  }, []);

  return loading ? (
    <Flex justify="center" align="center" style={{height: "100vh"}}>
      <Typography.Title level={3} style={{ color: "white" }}>
        Загрузка...
      </Typography.Title>
    </Flex>
  ) : (
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
      </Routes>
    </Router>
  );
}

export default App;
