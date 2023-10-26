import { useState } from "react";
import { useProductStore } from "../../app/state.ts";
import { Pagination, Product, Sorting } from "../../entities/types.ts";

export const useFetchProduct = async (props: { token: string | undefined }) => {
  const [setProducts, products] = useProductStore((state) => [
    state.addProductToStore,
    state.products,
  ]);
  const authorization = props?.token
    ? { Authorization: `Bearer ${props.token}` }
    : undefined;
  const PRODUCTS = `https://19429ba06ff2.vps.myjino.ru/api/products`;
  const [loading, setLoading] = useState<boolean>(true);
  if (!products) {
    try {
      const response = await fetch(PRODUCTS, {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          ...authorization,
        },
      });
      const result = await response.json();
      const { data, sorting, pagination } = (await result) as ApiResponse;
      data.length && setProducts(data);
    } catch (e) {
      console.log(e);
    }
  }
  return { loading };
};

interface ApiResponse {
  data: Product[];
  sorting: Sorting;
  pagination: Pagination;
}
