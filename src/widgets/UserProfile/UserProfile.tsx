import Loader from "../loader/Loader.tsx";
import ModalWindow from "../../features/modal/ModalWindow.tsx";
import { useState } from "react";
import { useProfileStore } from "../../app/state.ts";
import "../../shared/scss/profile-card.scss";
import { Profile } from "../../entities/User.ts";

export const UserProfile = () => {
  const [toChangeProfile, setToChangeProfile] = useState<boolean>(false);
  const [isUserAuth] = useProfileStore((state) => [state.isUserAuth]);
  const [user, editUser, fetchProfile] = useProfileStore((state) => [
    state.editUser,
    state.user,
    state.fetchProfile,
  ]);

  function handleCloseModal() {
    setToChangeProfile(false);
  }

  return (
    <div className="profile-container">
      <h2>Профиль</h2>
      {isUserAuth() && !!user ? (
        <div>
          <ProfileCard profile={user} />
        </div>
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

export const ProfileCard = (props: { profile: Profile | null }) => {
  const { profile } = props; // Деструктурируем profile из props
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile-card">
          <div className="field">Имя</div>
          <div className="field-value">{profile?.name || "Нет данных"}</div>

          <div className="field">email</div>
          <div className="field-value">{profile?.email || "Нет данных"}</div>

          <div className="field">Дата регистрации</div>
          <div className="field-value">
            {profile?.signUpDate.toDateString() || "Нет данных"}
          </div>

          <button onClick={() => {}}>Редактировать профиль</button>
        </div>
      )}
    </>
  );
};
