import { Button, Flex, Form, Input, Typography } from "antd";
import "./RegistrationBox.css";

const RegistrationBox: React.FC = () => {
  return (
    <Flex vertical align="center" className="registration-box">
      <div className="registration-box-heading">
        <Typography style={{ fontSize: "36px" }}>Создание аккаунта</Typography>
      </div>

      <Form style={{ width: "100%" }} layout="vertical">
        <Form.Item
          label="Имя пользователя"
          layout="vertical"
          name="username"
          rules={[
            { required: true, message: "Введите имя пользователя" },
            {
              max: 60,
              message: "Имя пользователя должно содержать не более 60 символов",
            },
            {
              pattern: /^[a-zA-Zа-яА-Я]{1,999}$/,
              message: "Допустимы только буквы русского и латинского алфавитов",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Логин"
          layout="vertical"
          name="login"
          rules={[
            { required: true, message: "Введите логин" },
            {
              min: 2,
              message: "Логин должен содержать не менее 2 символов",
            },
            {
              max: 20,
              message: "Логин должен содержать не более 20 символов",
            },
            {
              pattern: /^[a-zA-Z]{1,999}$/,
              message: "Допустимы только буквы латинского алфавита",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          layout="vertical"
          name="password"
          rules={[
            { required: true, message: "Введите пароль" },
            {
              min: 6,
              message: "Пароль должен содержать не менее 6 символов",
            },
            {
              max: 60,
              message: "Логин должен содержать не более 60 символов",
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="Повторите пароль"
          layout="vertical"
          name="repeatPassword"
          rules={[
            { required: true, message: "" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Почтовый адрес"
          layout="vertical"
          name="email"
          validateTrigger="onChange"
          rules={[
            { required: true, message: "" },
            { type: "email", message: "Введите корректный email" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Телефон"
          layout="vertical"
          name="phone"
          validateTrigger="onChange"
          rules={[
            { required: true, message: "" },
            {
              pattern: /^[+]?[0-9]{11}$/,
              message: "Введите корректный номер телефона",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button style={{ width: "100%", margin: "0" }} type="primary">
          Зарегистрироваться
        </Button>
      </Form>
    </Flex>
  );
};

export default RegistrationBox;
