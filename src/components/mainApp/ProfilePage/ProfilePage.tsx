import { Button, Typography } from "antd";
import { Flex } from "antd";
import "./ProfilePage.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/authSlice";
import { getUserProfile, logoutUser } from "../../../api/authApi";
import { useEffect, useState } from "react";
import { Profile } from "../../../types/auth";

const ProfilePage: React.FC = () => {
  const [userProfileData, setUserProfileData] = useState<Profile>();
  const dispatch = useDispatch();

  const hadleLogout = async () => {
    dispatch(logout());
    if (localStorage.getItem("accessToken"))
      try {
        await logoutUser();
        localStorage.setItem("accessToken", "");
        localStorage.setItem("refreshToken", "");
        console.log("Успешный логаут. Токены невалидны.");
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
  };

  const initUserProfile = async () => {
    if (localStorage.getItem("accessToken"))
      try {
        const userData = await getUserProfile();
        setUserProfileData(userData);
        console.log(userData);
      } catch {}
  };

  useEffect(() => {
    initUserProfile();
  }, []);

  return (
    <Flex vertical align="center">
      <Typography.Title
        level={2}
        style={{ color: "white", textAlign: "center", marginTop: "0.6rem" }}
      >
        ЛИЧНЫЙ КАБИНЕТ
      </Typography.Title>
      <Flex className="profile-board">
        <Typography.Title level={4}>Данные профиля</Typography.Title>
        <Flex vertical>
          <Flex>
            <Flex vertical style={{ width: "auto" }}>
              <Typography.Paragraph>
                {"Имя пользователя: "}
                <Typography.Text style={{ fontWeight: "500" }}>
                  {userProfileData?.username}
                </Typography.Text>
              </Typography.Paragraph>
              <Typography.Paragraph>
                {"Почтовый адрес: "}
                <Typography.Text style={{ fontWeight: "500" }}>
                  {userProfileData?.email}
                </Typography.Text>
              </Typography.Paragraph>
              <Typography.Paragraph>
                {"Номер телефона: "}
                <Typography.Text style={{ fontWeight: "500" }}>
                  {userProfileData?.phoneNumber
                    ? userProfileData?.phoneNumber
                    : "не указано"}
                </Typography.Text>
              </Typography.Paragraph>
            </Flex>
          </Flex>
          <Flex justify="center">
            <Button
              color="blue"
              variant="solid"
              style={{ width: "5rem" }}
              onClick={() => hadleLogout()}
            >
              Выйти
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfilePage;
