import { useEffect } from "react";

export const useFetchProduct = () => {
  const rawProducts = useStore((state) => state.rawProducts);
  const setRawProducts = useStore((state) => state.setRawProducts);
  const products = useStore((state) => state.products);
  const setProducts = useStore((state) => state.setProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const getProducts = async () => {
    await fetch(`https://dummyjson.com/products`)
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        setRawProducts(data.products);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    async function getRawProduct() {
      await getProducts().catch((err) => {
        setLoading(false);
        console.error(err);
      });
    }

    if (!rawProducts)
      getRawProduct().catch((err) => {
        setLoading(false);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rawProducts && !products) {
      setProducts(createProductHelper(rawProducts));
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawProducts]);
  return { loading, rawProducts, products };
};
