import Loader from "../loader/Loader.tsx";
import ModalWindow from "../../features/modal/ModalWindow.tsx";
import { useEffect, useState } from "react";
import { useProfileStore } from "../../app/state.ts";
import "../../shared/scss/profile-card.scss";
import { Profile } from "../../entities/User.ts";
import { getProfile } from "../../shared/api/getProfile.ts";

export const UserProfile = () => {
  const [toChangeProfile, setToChangeProfile] = useState<boolean>(false);
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

  function handleCloseModal() {
    setToChangeProfile(false);
  }

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {isUserAuth() && user !== null ? (
        <ProfileCard profile={user} />
      ) : (
        <Loader />
      )}

      {toChangeProfile && (
        <ModalWindow
          visible={true}
          onCloseModal={handleCloseModal}
          modalContent={<h3>Редактирование профиля</h3>}
        >
          {/*<ToRegisterUser />*/}
        </ModalWindow>
      )}
    </div>
  );
};

export const ProfileCard = (props: { profile: Profile }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile-card">
          <div className="field">Имя</div>
          <div className="field-value">
            {props.profile.name || "Нет данных"}
          </div>

          <div className="field">email</div>
          <div className="field-value">
            {props.profile.email || "Нет данных"}
          </div>

          <div className="field">Дата регистрации</div>
          <div className="field-value">
            {props.profile.signUpDate || "Нет данных"}
          </div>

          <button onClick={() => {}}>Редактировать профиль</button>
        </div>
      )}
    </>
  );
};
