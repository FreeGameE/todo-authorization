import { Button, Typography } from "antd";
import { Flex } from "antd";
import "./ProfilePage.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import { logoutUser } from "../../../api/authApi";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const hadleLogout = async () => {
    dispatch(logout());
    try {
      await logoutUser();
      console.log("Успешный логаут. Токены невалидны.");
    } catch (error) {
      console.error("Ошибка запроса:", error);
      }
  };

  return (
    <div className="main-board">
      <Flex vertical align="center" justify="center">
        <Typography.Title level={3}>Вход в профиль</Typography.Title>
        <Typography.Paragraph>Привет</Typography.Paragraph>
        <Button color="blue" variant="solid" onClick={() => hadleLogout()}>
          Выйти
        </Button>
      </Flex>
    </div>
  );
};

export default ProfilePage;
