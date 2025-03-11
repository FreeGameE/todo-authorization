import { Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import "./LoginBox.css"

const LoginBox: React.FC = () => {
  return (
    <Flex vertical align="center" className="login-box">
      <div className="login-box-heading">
        <Typography style={{ fontSize: "36px" }}>Войдите в аккаунт</Typography>
        <Typography style={{ fontSize: "16px" }}>
          Посмотрите, что с вашим бизнесом
        </Typography>
      </div>
      <Form style={{ width: "100%" }} layout="vertical">
        <Form.Item label="Логин" layout="vertical">
          <Input style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          label="Пароль"
          layout="vertical"
          style={{ width: "100%", margin: "0" }}
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
          <Button style={{ width: "100%", margin: "0" }} type="primary">
            Войти
          </Button>
        </Form.Item>
      </Form>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          width: "420px",
        }}
      >
        <Typography>Не зарегистрированы?</Typography>
        <Typography.Link>Создать аккаунт</Typography.Link>
      </div>
    </Flex>
  );
};

export default LoginBox;
