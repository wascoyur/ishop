import { useFetchProduct } from "../shared/api/useFetchProduct.ts";

type homeProps = {
  children?: React.ReactNode;
};
export const HomePage = ({ children }: homeProps) => {
  useFetchProduct();
  return (
    <>
      <h1>Домашняя страница</h1>
      {children}
      <ProductCardList />
    </>
  );
};
