import { FormEvent, useEffect, useState } from "react";
import "../shared/common-form.scss";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../app/state.ts";

export const LoginForm = () => {
  const setToken = useProfileStore((state) => state.setToken);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (login.length > 0 && password.length > 0) {
      setIsFilled(true);
      return;
    }
    setIsFilled(false);
  }, [login, password]);
  const handleLogInUser = (e: FormEvent) => {
    e.preventDefault();
    if (login === "admin" && password === "admpass") {
      setToken(login);
      return;
    }
    if (login === "user" && password === "password") {
      setToken(login);
      return;
    }

    navigate("/register");
  };

  return (
    <div className="default-style">
      <form onSubmit={handleLogInUser}>
        <label htmlFor="login">Ваш логин: user/admin</label>
        <input
          type="text"
          name="login"
          onChange={(e) => setLogin(e.target.value)}
        />
        <label htmlFor="password">Введите пароль: password/admpass</label>
        <input
          type="password"
          name="passwoord"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type={"submit"} disabled={!isFilled}>
          Войти
        </button>
      </form>
    </div>
  );
};
