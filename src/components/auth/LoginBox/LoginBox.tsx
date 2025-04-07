import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { authUser } from "../../../api/authApi";
import { AuthData } from "../../../types/authorization";
import "./LoginBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../../../store/store";
import { authStatusChange } from "../../../store/authSlice";

const LoginBox: React.FC = () => {
  const dispatch = useDispatch();
  const [isAuthFailed, setIsAuthFailed] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    const authData: AuthData = {
      login: values.login,
      password: values.password,
    };

    try {
      const response = await authUser(authData);
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setIsAuthFailed(false);
      dispatch(authStatusChange(true));
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsAuthFailed(true);
      } else {
        alert("Произошла ошибка. Попробуйте позже.");
      }
    }
  };

  return (
    <Flex vertical align="center" className="login-box">
      <div className="login-box-heading">
        <Typography style={{ fontSize: "36px" }}>Войдите в аккаунт</Typography>
        <Typography style={{ fontSize: "16px" }}>
          Посмотрите, что с вашим бизнесом
        </Typography>
      </div>
      <Form style={{ width: "100%" }} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Логин" layout="vertical" name="login">
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Пароль"
          layout="vertical"
          style={{ width: "100%", margin: "0" }}
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Form.Item>
            <Checkbox>Запомнить вход</Checkbox>
          </Form.Item>
          <Typography.Link>Забыли пароль?</Typography.Link>
        </div>
        <Form.Item>
          <Button
            style={{ width: "100%", margin: "0" }}
            type="primary"
            htmlType="submit"
          >
            Войти
          </Button>
          {isAuthFailed ? (
            <div style={{ position: "relative", width: "100%" }}>
              <Typography.Text
                type="danger"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "1rem",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Неверный логин или пароль.
              </Typography.Text>
            </div>
          ) : undefined}
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: "9rem",
        }}
      >
        <Typography style={{ marginRight: "1rem" }}>
          Не зарегистрированы?
        </Typography>
        <Typography.Link href="/register">Создать аккаунт</Typography.Link>
      </div>
    </Flex>
  );
};

export default LoginBox;
