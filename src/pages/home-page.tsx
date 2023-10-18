import { useFetchProduct } from "../shared/api/useFetchProduct.ts";
import { useProductStore } from "../app/state.ts";
import Loader from "../widgets/loader/Loader.tsx";

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

export const ProductCardList = () => {
  const products = useProductStore((state) => state.products);
  const idsList = products && products.map((p) => p.id);
  const ShortList = (): React.ReactNode => (
    <div className="card-list">
      {idsList ? (
        idsList.map((p) => (
          <div key={p}>
            <ProductCardList id={p} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
  return (
    <div className="product-card-list">
      <h3>Список товаров</h3>
      <ShortList />
    </div>
  );
};
