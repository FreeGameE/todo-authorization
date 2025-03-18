import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { AuthData, authUser } from "../../../api/authorizationApi";
import "./LoginBox.css";

const LoginBox: React.FC = () => {
  const onFinish = async (values: any) => {
    const authData: AuthData = {
      login: values.login,
      password: values.password,
    };

    try {
      const loginData = await authUser(authData);
      console.log(loginData.accessToken);
      console.log(loginData.refreshToken);
    } catch (error) {
      console.error("Ошибка при передаче данных:", error);
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
