import { useStore } from "src/store/state";
import { useEffect, useState } from "react";
import {useProductStore} from "../../app/state.ts";

export const useFetchProduct = () => {
  const setProducts = useProductStore((state) => state.addProductToStore);
  const [loading, setLoading] = useState<boolean>(true);
  const getProducts = async () => {
    const products =await fetch()
  return { loading, rawProducts, products };
};
