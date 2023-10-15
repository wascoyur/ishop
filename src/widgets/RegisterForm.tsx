import { FormEvent, useEffect, useRef, useState } from "react";
import "../shared/common-form.scss";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../app/state.ts";
import { AuthResult, ServerErrors } from "../entities/types.ts";
import Loader from "./loader/Loader.tsx";

export const RegisterForm = () => {
  const token = useProfileStore((state) => state.token);
  const navigate = useNavigate();
  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  const [data, setData] = useState<Auth>({} as Auth);
  const { error, loading, authtoken } = useAuthSignIn(data);

  const handleLogInUser = async (e: FormEvent) => {
    e.preventDefault();
    // login && password && setData({ login, password });
    // !token && navigate("/register");
    console.log({ error });
  };

  return (
    <div className="default-style">
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleLogInUser}>
          <label htmlFor="login">Введите логин</label>
          <input
            ref={loginRef}
            type="text"
            name="login"
            // onChange={(e) => setLogin(e.target.value)}
          />
          <label htmlFor="password">Введите пароль</label>
          <input
            ref={passwordRef}
            type="password"
            name="passwoord"
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button type={"submit"} disabled={!login || !password}>
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
export const signIn = async (props: Auth) => {
  const SIGNIN = `https://19429ba06ff2.vps.myjino.ru/api/signin?login=${props.login}&password=${props.password}`;

  try {
    const res = await fetch(SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log(res.json());
    const { token, errors } = res as unknown as AuthResult & ServerErrors;
    return { token: token, errors: errors } as Answer;
  } catch (e) {
    console.error(e);
  }
};

type Answer = AuthResult & ServerErrors;
const useAuthSignIn = (props: Auth) => {
  const { login, password, commandId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ServerErrors>({} as ServerErrors);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    async function auth() {
      setLoading(true);
      await signIn({
        login,
        password,
        commandId,
      }).then((res) => {
        console.log(res);
      });
    }

    if (login && password) {
      auth();
    }
  }, [login, password, commandId]);
  return { error, loading, authtoken: token };
};

export const signUp = async (props: Auth) => {
  const SIGNIN = `https://19429ba06ff2.vps.myjino.ru/api/signup?login=${props.login}&password=${props.password}`;
  const { login, password, commandId } = props;
  try {
    const res = await fetch(SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: login,
        password: password,
        commandId: commandId,
      }),
      // console.log(res.json());
      // const { token, errors } = res as unknown as AuthResult & ServerErrors;
      // return { token: token, errors: errors } as Answer;
    });
  } catch (e) {
    console.error(e);
  }
};
