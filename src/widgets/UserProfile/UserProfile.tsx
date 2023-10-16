import Loader from "../loader/Loader.tsx";
import ModalWindow from "../../features/modal/ModalWindow.tsx";
import { useState } from "react";
import { useProfileStore } from "../../app/state.ts";
import "../../shared/scss/profile-card.scss";

export const UserProfile = () => {
  // const [toChangePass, setToChangePass] = useState<boolean>(false);
  const [toChangeProfile, setToChangeProfile] = useState<boolean>(false);
  const isUserAuth = useProfileStore((state) => state.isUserAuth);

  const handleProfile = () => {
    setToChangeProfile(true);
  };

  function handleCloseModal() {
    setToChangeProfile(false);
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {isUserAuth() ? (
        <div>
          <ProfileCard onEditProfile={handleProfile} />
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

export const ProfileCard = () => {
  const [user, editUser] = useProfileStore((state) => [
    state.editUser,
    state.user,
  ]);
  return (
    <div className="profile-card">
      <div className="field">Имя</div>
      <div className="field-value">{"name" || user}</div>

      <div className="field">email</div>
      <div className="field-value">{"email" || user?.email}</div>

      <div className="field">Дата регистрации</div>
      <div className="field-value">
        {"Дата" || user?.signUpDate?.getUTCDate()}
      </div>

      <button onClick={() => editUser()}>Редактировать профиль</button>
    </div>
  );
};
