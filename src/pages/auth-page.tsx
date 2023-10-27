import { useProfileStore } from "../app/state.ts";
import { LoginForm } from "../entities/UserProfile/LoginForm.tsx";
import { Button } from "@radix-ui/themes";
import { UserProfile } from "../widgets/UserProfile/UserProfile.tsx";

export const AuthPage = () => {
  const [isUserAuth, clearToken] = useProfileStore((state) => [
    state.isUserAuth,
    state.clearToken,
  ]);

  return (
    <div>
      <h1>{isUserAuth() ? "Вход в профиль" : "Регистрация или Вход"}</h1>

      {isUserAuth() ? (
        <>
          <UserProfile />
          <div className="default-style">
            <Button size="4" onClick={clearToken}>
              Выйти из профиля
            </Button>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
