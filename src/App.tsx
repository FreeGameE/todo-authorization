import React, { useRef } from "react";
import TodoListPage from "./components/mainApp/TodoListPage/TodoListPage";
import ProfilePage from "./components/mainApp/ProfilePage/ProfilePage";
import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import SiderBar from "./components/mainApp/SiderBar/SiderBar";
import { BrowserRouter as Router } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage/AuthPage";

function App() {
  const todoPageRef = useRef(<TodoListPage />);

  return (
    <Router>
      <Layout>
        <SiderBar />
        <Layout
          style={{ backgroundColor: "rgb(74, 137, 200)", minHeight: "100vh" }}
        >
          <Routes>
            <Route path="/" element={todoPageRef.current} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Layout>
    </Router>
    // <Router>

    //   <AuthPage />  
    // </Router>
  );
}

export default App;
