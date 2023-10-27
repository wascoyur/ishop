import { Auth } from "./apiTypes.ts";

export const signUp = async (props: Auth) => {
  const SIGNIN = `https://19429ba06ff2.vps.myjino.ru/api/signup`;
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
    });
  } catch (e) {
    console.error(e);
  }
};
