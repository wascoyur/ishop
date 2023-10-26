export const getProfile = async (token: string | undefined) => {
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
    return await profile.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};
