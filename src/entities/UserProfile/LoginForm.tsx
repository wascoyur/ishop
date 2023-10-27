import { FormEvent, useEffect, useState } from "react";
import "../../shared/scss/common-form.scss";
import { useErrorStore, useProfileStore } from "../../app/state.ts";
import Loader from "../../widgets/loader/Loader.tsx";
import { Auth } from "../../shared/api/apiTypes.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthSignIn } from "../../shared/api/useSinIn.ts";
import { Button } from "@radix-ui/themes";
import ToastErrors from "../../widgets/Notify/Toast.tsx";

export const LoginForm = () => {
  const token = useProfileStore((state) => state.token);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<Auth>({} as Auth);
  const { loading, isAuth } = useAuthSignIn(data);
  const navigate = useNavigate();
  const [errors, clearErrors] = useErrorStore((state) => [
    state.errors,
    state.clearErrors,
  ]);

  useEffect(() => {
    isAuth() && navigate("/profile");
    return () => {
      clearErrors();
    };
  }, [isAuth]);

  const handleLogInUser = async (e: FormEvent) => {
    e.preventDefault();
    login && password && setData({ login, password });
    if (token !== null) {
      setData({ login: "", password: "" });
    }
  };

  return (
    <div className="default-style">
      {errors && <ToastErrors errorMessage={errors.errors[0].message} />}
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleLogInUser}>
          <label htmlFor="login">Введите логин</label>
          <input
            type="text"
            name="login"
            onChange={(e) => setLogin(e.target.value)}
          />
          <label htmlFor="password">Введите пароль</label>
          <input
            type="password"
            name="passwoord"
            onChange={(e) => setPassword(e.target.value)}
          />

          <NavLink to={"/register"}>Зарегистрироваться</NavLink>
          <Button type={"submit"} disabled={!login || !password}>
            Войти
          </Button>
        </form>
      )}
    </div>
  );
};
