import { Box, Button, Table } from "@radix-ui/themes";

import { useProductStore, useProfileStore } from "../app/state.ts";
import Loader from "../widgets/loader/Loader.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetchCategories } from "../shared/api/getCategories.ts";
import { ButtonEditCategory } from "../widgets/editCategories/editCategoriesForm.tsx";

export const CategoryPage = () => {
  const categories = useProductStore((state) => state.categories);
  const isAuth = useProfileStore((state) => state.isUserAuth);
  const navigate = useNavigate();
  useFetchCategories();
  useEffect(() => {
    !isAuth() && navigate("/profile");
  }, [isAuth]);

  return (
    <div>
      <h1>Страница редактирования товаров товаров</h1>

      <Box>
        {categories ? (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>id</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Наименование</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Фото</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Создан</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Обновлен</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {categories.map((category) => {
                const dateCreated = new Date(category.createdAt);
                const datemodify = new Date(category.updatedAt);
                return (
                  <Table.Row key={category.id + Math.random()}>
                    <Table.Cell style={{ width: "3rem" }}>
                      {category.id}
                    </Table.Cell>
                    <Table.Cell width={2}>{category.name}</Table.Cell>
                    <Table.Cell justify="start">
                      {
                        <img
                          src={category.photo}
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

                    <Table.Cell>
                      <Box>
                        <Button color="red" size="2" my="2">
                          Удалить
                        </Button>
                        <ButtonEditCategory categoryId={category.id} />
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        ) : (
          <Loader />
        )}
      </Box>
    </div>
  );
};
