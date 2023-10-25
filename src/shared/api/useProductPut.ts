import { Params, Product } from "../../entities/types.ts";
import { OPERATION } from "./apiTypes.ts";

export const putProduct = async (props: {
  token?: string;
  params: Params & Pick<Product, "id">;
}) => {
  const { params, token } = props;
  const PUT_PRODUCT = `https://19429ba06ff2.vps.myjino.ru/api/products/${params.id}`;
  const productParams = {
    categoryId: params.categoryId,
    name: params.name,
    desc: params.desc,
    oldPrice: params.oldPrice,
    price: params.price,
    photo: params.photo,
  };

  try {
    const result = await fetch(PUT_PRODUCT, {
      method: `PUT`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productParams),
    });

    if (result.ok) {
      const updatedProduct = await result.json();
      return { response: updatedProduct, errors: undefined };
    } else {
      const errorData = await result.json();
      return { response: undefined, errors: errorData };
    }
  } catch (e) {
    console.error(e);
    return { response: undefined, errors: "An error occurred." };
  }
};

export const deleteProduct = async (
  props: {
    id: string;
    token: string;
  } & OPERATION,
) => {
  const { id, token } = props;
  const DEL_PRODUCT = `https://19429ba06ff2.vps.myjino.ru/api/products/${id}`;

  try {
    const result = await fetch(DEL_PRODUCT, {
      method: props.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (result.ok) {
      const deleteProduct = await result.json();
      return await deleteProduct;
    } else {
      const errorData = await result.json();
      return { response: undefined, errors: errorData };
    }
  } catch (e) {
    console.error(e);
    return { response: undefined, errors: "An error occurred." };
  }
};
