import { Auth } from "./apiTypes.ts";
import { useEffect, useState } from "react";
import { useErrorStore, useProfileStore } from "../../app/state.ts";
import { signIn } from "./signin.ts";

export const useAuthSignIn = (props: Auth) => {
  const { login, password, commandId } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [setToken, isAuth] = useProfileStore((state) => [
    state.setToken,
    state.isUserAuth,
  ]);
  const setError = useErrorStore((state) => state.setError);

  useEffect(() => {
    async function auth() {
      setLoading(true);
      try {
        const answer = await signIn({
          login,
          password,
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
  return { loading, isAuth };
};
