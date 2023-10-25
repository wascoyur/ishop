import { useProductStore, useProfileStore } from "../app/state.ts";
import { Box, Button, Table } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../widgets/loader/Loader.tsx";
import { useFetchProduct } from "../shared/api/useFetchProduct.ts";
import { BucketItem, Product } from "../entities/types.ts";

export const BucketPage = () => {
  const [isAuth, token] = useProfileStore((state) => [
    state.isUserAuth,
    state.token,
  ]);
  const navigate = useNavigate(); // Перемещено сюда

  useEffect(() => {
    !isAuth() && navigate("/profile");
  }, [isAuth]);
  useFetchProduct({ token });
  const [bucket, getProductById, removeItemBucketById, products] =
    useProductStore((state) => [
      state.bucket,
      state.getProductById,
      state.removeItemBucketById,
      state.products,
    ]);

  function handleOrder() {}

  const totalPay = (
    arr: BucketItem[],
    getProductById: (id: string) => Product | undefined,
  ) => {
    return arr.reduce((acc, item) => {
      const p = getProductById(item.productId);
      if (p) {
        return acc + p.price * item.count;
      }
      return acc;
    }, 0);
  };

  return (
    <div>
      <h1>Корзина</h1>
      <Box>
        {bucket?.length ? (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Наименование</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Фото</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Категория</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Цена</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Кол</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Итого</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Действия</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products ? (
                bucket.map((item) => {
                  const p = getProductById(item.productId)!;
                  const dateCreated = new Date(p.createdAt) || new Date();
                  const datemodify = new Date(p.updatedAt) || new Date();
                  return p ? (
                    <Table.Row key={p.id + Math.random()}>
                      <Table.Cell width={2}>{p.name}</Table.Cell>
                      <Table.Cell justify="start">
                        <img
                          src={p.photo}
                          style={{
                            display: "block",
                            objectFit: "contain",
                            width: "100%",
                            height: 100,
                          }}
                          alt="img"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        {p?.category?.name || "Неизвестно"}
                      </Table.Cell>
                      <Table.Cell>{p.price} р.</Table.Cell>
                      <Table.Cell>{item.count} шт</Table.Cell>
                      <Table.Cell>{item.count * p.price}р.</Table.Cell>
                      <Table.Cell>
                        <Button
                          color="indigo"
                          my="2"
                          size="4"
                          onClick={() => removeItemBucketById(item.productId)}
                        >
                          Удалить из корзины
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    <Table.Row>
                      <Table.Cell>
                        <Loader />
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell>
                    <Loader />
                  </Table.Cell>
                </Table.Row>
              )}
              <Table.Row>
                <Table.Cell>Итого к оплате: </Table.Cell>
                <Table.Cell>{totalPay(bucket, getProductById)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Button size="4" onClick={handleOrder}>
                    Оформить заказ
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        ) : (
          <div>В корзине пока нет товаров</div>
        )}
      </Box>
    </div>
  );
};
