import { Box, Button, Dialog } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProductStore, useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import { putProduct } from "../../shared/api/useProductPut.ts";
import { Params } from "../../entities/types.ts";
import Loader from "../loader/Loader.tsx";
import * as Toast from "@radix-ui/react-toast";

export const ButtonEditCategory = (props: { categoryId: string }) => {
  const [getProductById, categories] = useProductStore((state) => [
    state.getProductById,
    state.categories,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useProfileStore((state) => state.token);
  const targetProduct = getProductById(props.categoryId);

  const handleSubmit = async (
    e: HTMLFormElement | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const updatedProduct: Params = {
      name: data.get("productName") as string,
      photo: data.get("productPhoto") as string,
      price: parseFloat(data.get("productPrice") as string),
      categoryId: data.get("categoryName") as string,
    };
    console.log({ updatedProduct });
    setLoading(true);
    const { response, errors } = await putProduct({
      token: token!,
      params: { ...updatedProduct, id: props.categoryId },
    });
    if (errors) {
      setLoading(false);
      return (
        <Toast.Root>
          <Toast.Title>ошибка получения данных</Toast.Title>
        </Toast.Root>
      );
    } else if (response) {
      return <Toast.Root></Toast.Root>;
    }
  };
  const FormEditProduct = () => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Box>
        <Form.Field name={"productName"}>
          <Form.Label>Наименование продукта</Form.Label>
          <Form.Message match="valueMissing">
            Введите наименование товара
          </Form.Message>
          <Form.Control asChild>
            <input placeholder={targetProduct!.name} type="text" required />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"productPhoto"}>
          <Form.Label>Фото</Form.Label>
          <Form.Message match="valueMissing">
            Фставьте ссылку на фото товара
          </Form.Message>
          <Form.Control asChild>
            <input type="text" required />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"productPrice"}>
          <Form.Label>Цена товара</Form.Label>
          <Form.Message match="valueMissing">Введите цену</Form.Message>
          <Form.Control asChild>
            <input value={targetProduct!.price} type="text" required />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"Category"}>
          <Form.Label>Категория</Form.Label>
          <Form.Message match="valueMissing">Выберите категорию</Form.Message>
          <Form.Control asChild>
            <select name="categoryName">
              <option
                value="category"
                defaultValue={targetProduct!.category.name}
              >
                {targetProduct!.category.name}
              </option>
              {categories &&
                categories.map((c) => {
                  return (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button>Сохранить</Button>
        </Form.Submit>
      </Box>
    </Form.Root>
  );
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2">Редактировать</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormEditProduct />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
