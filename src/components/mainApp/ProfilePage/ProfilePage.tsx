import { Button, Typography } from "antd";
import { Flex } from "antd";
import "./ProfilePage.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="main-board">
      <Flex vertical align="center" justify="center">
        <Typography.Title level={3}>Вход в профиль</Typography.Title>
        <Typography.Paragraph>Привет</Typography.Paragraph>
        <Button color="blue" variant="solid" onClick={() => dispatch(logout())}>
          Выйти
        </Button>
      </Flex>
    </div>
  );
};

export default ProfilePage;
