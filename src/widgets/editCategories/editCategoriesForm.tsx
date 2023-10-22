import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
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
  const FormEditCategory = () => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Box>
        <Form.Field name={"productName"}>
          <Form.Label>Наименование категории</Form.Label>
          <Form.Message match="valueMissing">
            Введите наименование категории
          </Form.Message>
          <Form.Control asChild>
            <input type="text" required />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"productPhoto"}>
          <Form.Label>Фото</Form.Label>
          <Form.Message match="valueMissing">
            Фставьте ссылку на фото категории
          </Form.Message>
          <Form.Control asChild>
            <input type="text" required />
          </Form.Control>
        </Form.Field>
        <Flex justify="between">
          <Form.Submit asChild>
            <Button>Сохранить</Button>
          </Form.Submit>
          <Button>Отменить</Button>
        </Flex>
      </Box>
    </Form.Root>
  );
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="2">Редактировать</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormEditCategory />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
