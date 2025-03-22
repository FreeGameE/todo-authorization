import { Typography } from "antd";
import { Flex } from "antd";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
  return (
    <div className="main-board">
      <Flex vertical align="center" justify="center" >
        <Typography.Title level={3}>Вход в профиль</Typography.Title>
        <Typography.Paragraph>Привет</Typography.Paragraph>
      </Flex>
    </div>
  );
};

export default ProfilePage;
