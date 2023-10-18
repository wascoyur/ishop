import { FormEvent, useEffect, useRef, useState } from "react";
import "../shared/common-form.scss";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../app/state.ts";
import { ServerErrors } from "../entities/types.ts";
import Loader from "./loader/Loader.tsx";

export const RegisterForm = () => {
  const token = useProfileStore((state) => state.token);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const commandRef = useRef<HTMLInputElement | null>(null);
  const [data, setData] = useState<Auth>({} as Auth);
  const { error, loading } = useAuthSignUp(data);
  const navigate = useNavigate();
  useEffect(() => {
    token && navigate("/home");
  }, [token]);
  const handleLogInUser = async (e: FormEvent) => {
    e.preventDefault();
    const login = loginRef.current?.value;
    const password = passwordRef.current?.value;
    const commandId = commandRef.current?.value || undefined;
    login && password && setData({ login, password, commandId });
  };
  const isError = (error: ServerErrors | undefined) => {
    const err = error?.errors?.length || false;
    if (err) {
      // setPassword("");
    }
    return err;
  };
  return (
    <div className="default-style">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleLogInUser}>
          <label htmlFor="login">Введите логин</label>
          <input ref={loginRef} type="text" name="login" />
          <label htmlFor="password">Введите пароль</label>
          <input ref={passwordRef} type="password" name="passwoord" />
          <label htmlFor="commandRef">Введите номер команды</label>
          <input ref={commandRef} type="text" name="passwoord" />
          {isError(error) && (
            <strong className="error-message">
              {error?.errors[0].message}
            </strong>
          )}
          <button type={"submit"} disabled={false}>
            Войти
          </button>
        </form>
      )}
    </div>
  );
};

type Auth = {
  login: string;
  password: string;
  commandId?: string;
};

const useAuthSignUp = (props: Auth) => {
  const { login, password, commandId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [setToken, isAuth] = useProfileStore((state) => [
    state.setToken,
    state.isUserAuth,
  ]);
  const [error, setError] = useState<ServerErrors>();

  useEffect(() => {
    async function auth() {
      setLoading(true);
      try {
        const answer = await signUp({
          login,
          password,
          commandId,
        });

        if (answer && answer.ok) {
          const result = await answer.json();
          setToken(result.token);
        } else {
          if (answer) {
            const errors = await answer.json();

            setError(errors);
          }
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    if (login && password) {
      auth();
    }
  }, [login, password, commandId]);
  return { error, loading, isAuth };
};

export const signUp = async (props: Auth) => {
  const SIGNUP = `https://19429ba06ff2.vps.myjino.ru/api/signup`;
  const { login, password, commandId } = props;
  try {
    const res = await fetch(SIGNUP, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: login,
        password: password,
        commandId: commandId,
      }),
    });
    return await res;
  } catch (e) {
    console.error(e);
  }
};
