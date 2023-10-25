import { ServerErrors } from "../../entities/types.ts";
import { OrderStatus } from "../../entities/typeOrders.ts";

export const controlOrder = async (props: {
  products: { id: string; quantity: number }[];
  method: string;
  token: string;
  status: OrderStatus.Processing;
}) => {
  const CREATE_ORDER = `https://19429ba06ff2.vps.myjino.ru/api/orders`;
  const authorization = props?.token
    ? { Authorization: `Bearer ${props.token}` }
    : undefined;
  try {
    const response = await fetch(CREATE_ORDER, {
      method: props.method,
      headers: {
        "Content-Type": "application/json",
        ...authorization,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        products: props.products,
        status: props.status,
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
