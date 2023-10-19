import { Box, Button, Table } from "@radix-ui/themes";
import { useProductStore } from "../app/state.ts";
import Loader from "../widgets/loader/Loader.tsx";
import ModalWindow from "../features/modal/ModalWindow.tsx";

export const ProductsPage = () => {
  const [products, addProductToStore, removeProductById] = useProductStore(
    (state) => [
      state.products,
      state.addProductToStore,
      state.removeProductById,
    ],
  );

  return (
    <div>
      <h1>Страница редактирования товаров товаров</h1>

      <Box>
        {products ? (
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
              {products.map((p) => {
                const dateCreated = new Date(p.createdAt);
                const datemodify = new Date(p.updatedAt);
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
                      <Box>
                        <Button color="red" size="2" my="2">
                          Удалить
                        </Button>
                        <Button size="2">Редактировать</Button>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        ) : (
          <ModalWindow visible={true}>
            <Loader />
          </ModalWindow>
        )}
      </Box>
    </div>
  );
};