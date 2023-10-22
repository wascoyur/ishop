import { Box, Button, Dialog } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProductStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import { usePutProduct } from "../../shared/api/useProductPut.ts";
import { Params, Product } from "../../entities/types.ts";

export const ButtonEditProduct = (props: { productId: string }) => {
  const [getProductById, categories] = useProductStore((state) => [
    state.getProductById,
    state.categories,
  ]);
  console.log({ categories });
  const targetProduct = getProductById(props.productId);
  const [formData, setFormData] = useState<Params>();
  const data: Params & Pick<Product, "id"> = {
    categoryId: "",
    name: "",
    price: 0,
    ...formData,
    id: props.productId,
  };
  const { loading, response, errors } = usePutProduct(data);

  const handleSubmit = (e: HTMLFormElement | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const updatedProduct: Params = {
      name: data.get("productName") as string,
      photo: data.get("productPhoto") as string,
      price: parseFloat(data.get("productPrice") as string),
      categoryId: data.get("categoryName") as string,
    };
    setFormData(updatedProduct);
    console.log(updatedProduct);
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
            <input value={targetProduct!.name} type="text" required />
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
                  return <option>{c.name}</option>;
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
        <FormEditProduct />
      </Dialog.Content>
    </Dialog.Root>
  );
};
