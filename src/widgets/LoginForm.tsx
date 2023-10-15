import { FormEvent, useEffect, useState } from "react";
import "../shared/common-form.scss";
import { useProfileStore } from "../app/state.ts";
import Loader from "./loader/Loader.tsx";
import { signIn } from "../shared/api/signin.ts";
import { Auth } from "../shared/api/apiTypes.ts";
import { ServerErrors } from "../entities/types.ts";

export const LoginForm = () => {
  const token = useProfileStore((state) => state.token);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<Auth>({} as Auth);
  const { loading } = useAuthSignIn(data);

  const handleLogInUser = async (e: FormEvent) => {
    e.preventDefault();
    login && password && setData({ login, password });
    if (token) setData({ login: "", password: "" });
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
          <button type={"submit"} disabled={!login || !password}>
            Войти
          </button>
        </form>
      )}
    </div>
  );
};

const useAuthSignIn = (props: Auth) => {
  const { login, password, commandId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [setToken] = useProfileStore((state) => [state.setToken]);
  const [error, setError] = useState<ServerErrors>();

  useEffect(() => {
    async function auth() {
      setLoading(true);
      try {
        const answer = await signIn({
          login,
          password,
          commandId,
        });

        if (answer && answer.ok) {
          const result = await answer.json();
          setToken(result.token);
        } else {
          if (answer) {
            const errors = (await answer.json()) as ServerErrors;
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
  return { error, loading };
};
