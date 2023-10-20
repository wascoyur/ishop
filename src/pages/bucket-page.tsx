import { useProductStore, useProfileStore } from "../app/state.ts";
import { Box, Button, Table } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const BucketPage = () => {
  const [bucket, getProductById, removeItemBucketById] = useProductStore(
    (state) => [state.bucket, state.getProductById, state.removeItemBucketById],
  );
  const isAuth = useProfileStore((state) => state.isUserAuth);
  const navigate = useNavigate();
  useEffect(() => {
    !isAuth() && navigate("/profile");
  }, [isAuth]);
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
                <Table.ColumnHeaderCell>Создан</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Обновлен</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Цена новая</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Категория</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Действия</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {bucket.map((item) => {
                const p = getProductById(item.productId)!;
                const dateCreated = new Date(p.createdAt) || new Date();
                const datemodify = new Date(p.updatedAt) || new Date();
                return (
                  <Table.Row key={p.id + Math.random()}>
                    <Table.Cell width={2}>{p.name}</Table.Cell>
                    <Table.Cell justify="start">
                      {
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
                      }
                    </Table.Cell>
                    <Table.Cell>{dateCreated.toDateString()}</Table.Cell>
                    <Table.Cell>{datemodify.toDateString()}</Table.Cell>
                    <Table.Cell>{p.price} р.</Table.Cell>
                    <Table.Cell>{p.category.name} р.</Table.Cell>
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
                );
              })}
            </Table.Body>
          </Table.Root>
        ) : (
          <div>В корзине пока нет товаров</div>
        )}
      </Box>
    </div>
  );
};
