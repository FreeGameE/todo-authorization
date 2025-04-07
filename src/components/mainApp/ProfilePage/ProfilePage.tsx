import { Button, Typography } from "antd";
import { Flex } from "antd";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/authSlice";
import { getUserProfile, logoutUser } from "../../../api/authApi";
import { useEffect, useState } from "react";
import { Profile } from "../../../types/authorization";
import { RootState } from "../../../store/store";

const ProfilePage: React.FC = () => {
  const [userProfileData, setUserProfileData] = useState<Profile>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
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
    <div className="profile-board">
      <Flex vertical align="center" justify="center">
        <Typography.Title level={3}>Профиль</Typography.Title>
        <Flex>
          <Flex vertical style={{width: "23rem"}}>
            <Typography.Paragraph>
              Имя пользователя: {userProfileData?.username}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Почтовый адрес: {userProfileData?.email}
            </Typography.Paragraph>
            <Typography.Paragraph>
              Номер телефона:{" "}
              {userProfileData?.phoneNumber
                ? userProfileData?.phoneNumber
                : "не указано"}
            </Typography.Paragraph>
          </Flex>
        </Flex>
        <Button color="blue" variant="solid" onClick={() => hadleLogout()}>
          Выйти
        </Button>
      </Flex>
    </div>
  );
};

export default ProfilePage;
