import Loader from "../loader/Loader.tsx";
import ModalWindow from "../../features/modal/ModalWindow.tsx";
import { useState } from "react";
import { useProfileStore } from "../../app/state.ts";
import { User } from "../../entities/User.ts";

export const UserProfile = () => {
  // const [toChangePass, setToChangePass] = useState<boolean>(false);
  const [toChangeProfile, setToChangeProfile] = useState<boolean>(false);
  const loggedUser = useProfileStore((state) => state.isUserAuth);

  const handleProfile = () => {
    setToChangeProfile(true);
  };

  function handleCloseModal() {
    setToChangeProfile(false);
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {loggedUser ? (
        <div>
          <ProfileCard user={loggedUser} onEditProfile={handleProfile} />
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

export type typeUserProfileCardProps = {
  user: User;
  onEditProfile: () => void;
};
export const ProfileCard: React.FC<typeUserProfileCardProps> = ({
  user,
  onEditProfile,
}) => {
  return (
    <div className="profile-card">
      <div className="field">Имя</div>
      <div className="field-value">{user.name}</div>
      <div className="field">Псевдоним</div>
      <div className="field-value">{user.username}</div>
      <div className="field">Телефон</div>
      <div className="field-value">{user.phone}</div>
      <div className="field">email</div>
      <div className="field-value">{user.email}</div>
      <div className="field">Компания</div>
      <div className="field-value">{user?.company?.name}</div>
      <div className="field">Город</div>
      <div className="field-value">{user?.address?.city}</div>
      <div className="field">О себе</div>
      <div className="field-value">{user?.about}</div>
      <button onClick={onEditProfile}>Редактировать профиль</button>
    </div>
  );
};
