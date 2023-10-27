import { Box, Table } from "@radix-ui/themes";
import {
  useErrorStore,
  useProductStore,
  useProfileStore,
} from "../app/state.ts";
import Loader from "../widgets/loader/Loader.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetchProduct } from "../shared/api/useFetchProduct.ts";
import { ButtonEditProduct } from "../widgets/editProductForm/editProductForm.tsx";
import { useFetchCategories } from "../shared/api/getCategories.ts";
import "../shared/scss/common-form.scss";
import { ButtonDeleteProduct } from "../widgets/editProductForm/deleteProductButton.tsx";
import ToastErrors from "../widgets/Notify/Toast.tsx";

export const ProductsPage = () => {
  const [products] = useProductStore((state) => [state.products]);
  useFetchCategories();
  const [isAuth, token] = useProfileStore((state) => [
    state.isUserAuth,
    state.token,
  ]);
  const navigate = useNavigate();
  const [errors, clearErrors] = useErrorStore((state) => [
    state.errors,
    state.clearErrors,
  ]);
  useFetchProduct({ token });
  useEffect(() => {
    !isAuth() && navigate("/profile");
  }, [isAuth]);

  return (
    <div>
      <h1>Страница редактирования товаров</h1>
      {errors && <ToastErrors errorMessage={errors.errors[0].message} />}

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
                    <Table.Cell>
                      {p.category?.name || "Неизвестно"} р.
                    </Table.Cell>
                    <Table.Cell>
                      <Box>
                        <Box>
                          <ButtonDeleteProduct productId={p.id} />
                        </Box>
                        <Box>
                          <ButtonEditProduct productId={p.id} />
                        </Box>
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
