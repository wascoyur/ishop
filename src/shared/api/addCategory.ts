import { ServerErrors } from "../../entities/types.ts";
import { addCategoryParams } from "./apiTypes.ts";

export const addCategory = async (props: addCategoryParams) => {
  const ADD_CATEGORY = `https://19429ba06ff2.vps.myjino.ru/api/categories`;
  try {
    const response = await fetch(ADD_CATEGORY, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: props.name,
        photo: props?.photo,
      }),
    });
    if (response.ok) {
      const category = await response.json();
      return category;
    } else {
      const errors = (await response.json()) as ServerErrors;
      return errors;
    }
  } catch (e) {
    console.error(e);
  }
};
