import { useFetchProduct } from "../shared/api/useFetchProduct.ts";
import { useProductStore, useProfileStore } from "../app/state.ts";
import Loader from "../widgets/loader/Loader.tsx";
import { Badge, Button, Card, Dialog, Heading, Text } from "@radix-ui/themes";
import "../shared/scss/product-card.scss";
import { AddToCartComponent } from "../widgets/product/addToCartComponent.tsx";
import { useFetchCategories } from "../shared/api/getCategories.ts";

type homeProps = {
  children?: React.ReactNode;
};
export const HomePage = ({ children }: homeProps) => {
  const token = useProfileStore((state) => state.token);
  useFetchProduct({ token });
  useFetchCategories();
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

  return (
    <div className="product-card-list">
      <h3>Список товаров</h3>
      <div className="product-card-grid">
        {products?.length ? (
          products.map((item) => (
            <Card
              size="1"
              style={{ maxWidth: 240 }}
              key={item.id + Math.random()}
              className="product-card"
            >
              <img
                className="product-image"
                src={item.photo}
                style={{
                  display: "block",
                  objectFit: "contain",
                  width: "100%",
                  height: 140,
                }}
              />
              <Text size="4">
                <Heading as="h4">{item.name}</Heading>
                <Text>Категория: {item?.category?.name || "Неизвестная"}</Text>
                <Text as="p">{item.desc}</Text>
                <Text>
                  <Badge variant="solid" color="indigo">
                    Цена: {item.price} р.
                  </Badge>
                  <Text>
                    <Badge variant="outline" color="grass">
                      Старая цена: {item.oldPrice} р.
                    </Badge>
                  </Text>
                </Text>
                <Text as="p">
                  <Dialog.Root>
                    <Dialog.Trigger>
                      <Button color="blue" variant="classic" mt="2">
                        В корзину
                      </Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                      <AddToCartComponent
                        productId={item.id}
                      ></AddToCartComponent>
                    </Dialog.Content>
                  </Dialog.Root>
                </Text>
              </Text>
            </Card>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
