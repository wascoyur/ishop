import { ServerErrors } from "../../entities/types.ts";
import { addCategoryParams, OPERATION } from "./apiTypes.ts";

export const controlCategory = async (
  props: addCategoryParams & { id: string } & OPERATION,
) => {
  const EDIT_CATEGORY = `https://19429ba06ff2.vps.myjino.ru/api/categories/${props.id}`;
  try {
    const response = await fetch(EDIT_CATEGORY, {
      method: props.method,
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
