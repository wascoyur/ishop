import { Auth } from "./apiTypes.ts";

export const signIn = async (props: Auth) => {
  const SIGNIN = `https://19429ba06ff2.vps.myjino.ru/api/signin`;

  try {
    return await fetch(SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: props.login, password: props.password }),
    });
  } catch (e) {
    console.error(e);
  }
};
