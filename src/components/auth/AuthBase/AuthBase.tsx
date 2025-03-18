import { Image } from "antd";
import React from "react";
import "./AuthPage.css";
import LoginBox from "../LoginBox/LoginBox";
import RegistrationBox from "../RegistrationBox/RegistrationBox";
import RegistrationCompletedBox from "../RegistrationCompletedBox/RegistrationCompletedBox";

const AuthBase: React.FC = () => {
  return (
    <div className="frame">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          // minWidth: "100%",
          maxHeight: "90vh",
        }}
      >
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
        <div
          style={{
            position: "absolute",
            top: "93%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.6)",
            whiteSpace: "nowrap",
          }}
        >
          Воплоти свои идеи в реальность.
        </div>
      </div>
      <div className="right-side">
        {/* <LoginBox /> */}
        {/* <RegistrationBox /> */}
        <RegistrationCompletedBox/>
      </div>
    </div>
  );
};

export default AuthBase;
