import Loader from "../loader/Loader.tsx";
import { useEffect, useState } from "react";
import { useProfileStore } from "../../app/state.ts";
import "../../shared/scss/profile-card.scss";
import { getProfile } from "../../shared/api/getProfile.ts";

export const UserProfile = () => {
  const [isUserAuth] = useProfileStore((state) => [state.isUserAuth]);
  const [editUser, token] = useProfileStore((state) => [
    state.editUser,
    state.token,
  ]);
  const user = useProfileStore((state) => state.user);
  useEffect(() => {
    async function fetchProfile() {
      const profile = await getProfile(token);
      editUser(await profile);
    }

    fetchProfile();
  }, [isUserAuth]);

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {isUserAuth() && user !== null ? <ProfileCard /> : <Loader />}
    </div>
  );
};

export const ProfileCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = useProfileStore((state) => state.user);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile-card">
          <div className="field">Имя</div>
          <div className="field-value">{user?.name || "Нет данных"}</div>

          <div className="field">email</div>
          <div className="field-value">{user?.email || "Нет данных"}</div>

          <div className="field">Дата регистрации</div>
          <div className="field-value">{user?.signUpDate || "Нет данных"}</div>
        </div>
      )}
    </>
  );
};
