import { OrderStatus } from "../../entities/typeOrders.ts";

export type Auth = {
  login: string;
  password: string;
  commandId?: string;
};
export type addCategoryParams = {
  name: string;
  photo?: string;
  token: string;
};
export type OPERATION = {
  method: `GET` | `PUT` | `PATCH` | `DELETE` | `POST`;
};

export type addOrder = {
  products: Array<{
    id: string;
    quantity: number;
  }>;
  status?: OrderStatus;
};
