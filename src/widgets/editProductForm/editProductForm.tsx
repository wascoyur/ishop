import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProductStore, useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import { putProduct } from "../../shared/api/useProductPut.ts";
import { Params, Product } from "../../entities/types.ts";
import Loader from "../loader/Loader.tsx";

export const ButtonEditProduct = (props: { productId: string }) => {
  const [getProductById, categories] = useProductStore((state) => [
    state.getProductById,
    state.categories,
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useProfileStore((state) => state.token);
  const targetProduct = getProductById(props.productId);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
      params: { ...updatedProduct, id: props.productId },
    });
    if (errors) {
      setLoading(false);
    } else if (response) {
      setLoading(false);
    }
  };
  const FormEditProduct = (props: { product: Product | undefined }) => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Box className="default-style">
        <Form.Field name={"productName"} className="FormField">
          <Form.Label>Наименование продукта</Form.Label>
          <Form.Message match="valueMissing">
            Введите наименование товара
          </Form.Message>
          <Form.Control asChild>
            <input
              placeholder={props?.product?.name || "Неизвестно"}
              type="text"
              required
              className="Input"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field
          name="productPhoto"
          placeholder={props?.product?.photo || "Неизвестно"}
          className="FormField"
        >
          <Form.Label>Фото</Form.Label>
          <Form.Message match="valueMissing">
            Фставьте ссылку на фото товара
          </Form.Message>
          <Form.Control asChild>
            <input
              placeholder={props?.product?.name || "Неизвестно"}
              type="text"
              required
              className="Input"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"productPrice"} className="FormField">
          <Form.Label>Цена товара</Form.Label>
          <Form.Message match="valueMissing">Введите цену</Form.Message>
          <Form.Control asChild>
            <input
              placeholder={String(props?.product?.price) || "Неизвестно"}
              type="number"
              required
              className="Input"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"Category"} className="FormField">
          <Form.Label>Категория</Form.Label>
          <Form.Message match="valueMissing">Выберите категорию</Form.Message>
          <Form.Control asChild>
            <select name="categoryName" className="Input">
              <option
                value="category"
                defaultValue={props.product?.category?.name || "Неизвестно"}
              >
                {props.product?.category?.name || "Неизвестно"}
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
        <Flex>
          <Form.Submit asChild>
            <Button>Сохранить</Button>
          </Form.Submit>
          <Dialog.Close>
            <Button onClick={() => setDialogOpen(false)}>Отменить</Button>
          </Dialog.Close>
        </Flex>
      </Box>
    </Form.Root>
  );
  return (
    <Dialog.Root open={dialogOpen}>
      <Dialog.Trigger>
        <Button size="2" onClick={() => setDialogOpen(true)}>
          Редактировать
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormEditProduct product={targetProduct} />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
