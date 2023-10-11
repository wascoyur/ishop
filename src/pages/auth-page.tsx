import { useProfileStore } from "../app/state.ts";
import { UserProfile } from "../widgets/UserProfile/UserProfile.tsx";
import { LoginForm } from "../widgets/LoginForm.tsx";

export const AuthPage = () => {
  const [isUserAuth, clearToken] = useProfileStore((state) => [
    state.isUserAuth,
    state.clearToken,
  ]);
  // const tokenAdmin = useStore((state) => state.tokenAdmin);
  // const clearTokens = useStore((state) => state.clearTokens);
  // const isUserAuth = tokenUser || tokenAdmin;
  return (
    <div>
      <h1>{isUserAuth() ? "Вход в профиль" : "Регистрация"}</h1>

      {isUserAuth() ? (
        <>
          <UserProfile />
          <div className="default-style">
            <button onClick={clearToken}>Выйти из профиля</button>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
