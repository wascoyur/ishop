import { Profile } from "../../entities/User.ts";

export const getProfile = async (token: string) => {
  const GET_PROFILE = `https://19429ba06ff2.vps.myjino.ru/api/profile`;

  try {
    const profile = await fetch(GET_PROFILE, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    const res = await profile.json();
    console.log({ res });
    return res as unknown as Profile;
  } catch (e) {
    console.error(e);
  }
};
