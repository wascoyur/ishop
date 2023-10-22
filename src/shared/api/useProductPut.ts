import { useEffect, useState } from "react";
import { useProfileStore } from "../../app/state.ts";
import { Params, Product } from "../../entities/types.ts";

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

export const PutProduct = (
  props: (Params & Pick<Product, "id">) | undefined,
) => {
  const token = useProfileStore((state) => state.token);
  const [errors, setErrors] = useState(undefined);
  const [response, setResponse] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const data: Params & Pick<Product, "id"> = {
    name: props!.name,
    photo: props!.photo,
    price: props!.price,
    oldPrice: props!.oldPrice,
    desc: props?.desc,
    categoryId: props!.categoryId,
    id: props!.id,
  };

  useEffect(() => {
    if (props?.id) {
      setLoading(true);
      putProduct({ params: data, token: token! }).then((result) => {
        if (result.response) {
          setResponse(result.response);
        } else {
          setErrors(result.errors);
        }
        setLoading(false);
      });
    }
  }, [token, props]);

  return { errors, response, loading };
};
