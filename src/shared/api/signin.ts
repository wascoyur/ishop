import { Auth } from "./apiTypes.ts";

export const signIn = async (props: Auth) => {
  const SIGNIN = `https://19429ba06ff2.vps.myjino.ru/api/signin`;

  try {
    const res = await fetch(SIGNIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: props.login, password: props.password }),
    });
    return await res;
  } catch (e) {
    console.log(`err`);
    console.error(e);
  }
};
