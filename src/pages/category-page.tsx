import { Box, Table } from "@radix-ui/themes";
import {
  useErrorStore,
  useProductStore,
  useProfileStore,
} from "../app/state.ts";
import Loader from "../widgets/loader/Loader.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetchCategories } from "../shared/api/getCategories.ts";
import { ButtonEditCategory } from "../widgets/editCategories/editCategoriesForm.tsx";
import { ButtonAddCategory } from "../widgets/editCategories/addCategoriesForm.tsx";
import { ButtonDeleteCategory } from "../widgets/editCategories/deleteCategory.tsx";
import ToastErrors from "../widgets/Notify/Toast.tsx";

export const CategoryPage = () => {
  const categories = useProductStore((state) => state.categories);
  const isAuth = useProfileStore((state) => state.isUserAuth);
  const navigate = useNavigate();
  useFetchCategories();
  useEffect(() => {
    !isAuth() && navigate("/profile");
  }, [isAuth]);
  const [errors, clearErrors] = useErrorStore((state) => [
    state.errors,
    state.clearErrors,
  ]);
  return (
    <div>
      <h1>Страница управления категориями</h1>
      {errors && (
        <ToastErrors errorMessage={errors.errors[0].extensions.code} />
      )}

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
                <Table.ColumnHeaderCell>Управление</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Создать</Table.ColumnHeaderCell>
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
                        <Box my="3">
                          <ButtonDeleteCategory categoryId={category.id} />
                        </Box>

                        <Box>
                          <ButtonEditCategory categoryId={category.id} />
                        </Box>
                      </Box>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
              <Table.Row>
                <Table.Cell>
                  <ButtonAddCategory />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        ) : (
          <Loader />
        )}
      </Box>
    </div>
  );
};
