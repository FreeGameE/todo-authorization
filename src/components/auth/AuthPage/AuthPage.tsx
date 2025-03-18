import { Image, Layout, Typography } from "antd";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginBox from "../LoginBox/LoginBox";
import RegistrationBox from "../RegistrationBox/RegistrationBox";
import RegistrationCompletedBox from "../RegistrationCompletedBox/RegistrationCompletedBox";
import "./AuthPage.css";

const { Content, Sider } = Layout;

const AuthPage: React.FC = () => {
  

  return (
    <Layout className="frame" style={{ height: "95vh" }}>
      <Sider width="56%" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/login-illustration.jpg"
          alt="Изображение списка задач"
          preview={false}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "100vh",
            objectFit: "cover",
          }}
        />
        <Typography
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          Воплоти свои идеи в реальность.
        </Typography>
      </Sider>

      {/* Правая часть с формами */}
      <Content className="right-side">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginBox />} />
          <Route path="/register" element={<RegistrationBox />} />
          <Route
            path="/register-success"
            element={<RegistrationCompletedBox />}
          />
        </Routes>
      </Content>
    </Layout>
  );
};

export default AuthPage;
