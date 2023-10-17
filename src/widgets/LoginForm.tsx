import { FormEvent, useEffect, useState } from "react";
import "../shared/common-form.scss";
import { useProfileStore } from "../app/state.ts";
import Loader from "./loader/Loader.tsx";
import { Auth } from "../shared/api/apiTypes.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthSignIn } from "../shared/api/useSinIn.ts";
import { ServerErrors } from "../entities/types.ts";

export const LoginForm = () => {
  const token = useProfileStore((state) => state.token);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<Auth>({} as Auth);
  const { loading, isAuth, error } = useAuthSignIn(data);
  const navigate = useNavigate();
  useEffect(() => {
    isAuth() && navigate("/profile");
  }, [isAuth]);
  const isError = (error: ServerErrors | undefined) => {
    const err = error?.errors?.length || false;
    if (err) {
      // setPassword("");
    }
    return err;
  };
  const handleLogInUser = async (e: FormEvent) => {
    e.preventDefault();
    login && password && setData({ login, password });
    if (token !== null) {
      setData({ login: "", password: "" });
    }
  };

  return (
    <div className="default-style">
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
          {isError(error) && (
            <strong className="error-message">
              {error?.errors[0].message}
            </strong>
          )}
          <NavLink to={"/register"}>Зарегистрироваться</NavLink>
          <button type={"submit"} disabled={!login || !password}>
            Войти
          </button>
        </form>
      )}
    </div>
  );
};
