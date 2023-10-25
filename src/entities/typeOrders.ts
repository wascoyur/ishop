import { Profile } from "./typesUser.ts";
import { Product } from "./types.ts";

export type Order = {
  id: string;
  products: OrderProduct[];
  user: Profile;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: Product;
  quantity: number;
};

export enum OrderStatus {
  PendingConfirmation = "pending_confirmation",
  Processing = "processing",
  Packaging = "packaging",
  WaitingForDelivery = "waiting_for_delivery",
  InTransit = "in_transit",
  Delivered = "delivered",
  ReturnRequested = "return_requested",
  OrderCancelled = "order_cancelled",
}
