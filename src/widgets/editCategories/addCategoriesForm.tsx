import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import { ServerErrors } from "../../entities/types.ts";
import Loader from "../loader/Loader.tsx";
import { getCategories } from "../../shared/api/getCategories.ts";

export const ButtonAddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = useProfileStore((state) => state.token);

  const handleSubmit = async (
    e: HTMLFormElement | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const newCategory: addCategoryParams = {
      token: token!,
      name: data.get("categoryName") as string,
      photo: data.get("categoryPhoto") as string,
    };
    setLoading(true);
    await addCategory(newCategory);
    await getCategories(token);
    setLoading(false);
  };
  const FormEditProduct = () => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Flex>
        <h2>Добавление категории</h2>
      </Flex>
      <Box>
        <Form.Field name={"categoryName"}>
          <Form.Label>Наименование категории</Form.Label>
          <Form.Control asChild>
            <input type="text" />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"categoryPhoto"}>
          <Form.Label>Фото категории</Form.Label>
          <Form.Control asChild>
            <input type="text" />
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
        <Button size="2">Добавить категорию</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormEditProduct />}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export const addCategory = async (props: addCategoryParams) => {
  const ADD_CATEGORY = `https://19429ba06ff2.vps.myjino.ru/api/categories`;
  try {
    const response = await fetch(ADD_CATEGORY, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: props.name,
        photo: props?.photo,
      }),
    });
    if (response.ok) {
      const category = await response.json();
      return category;
    } else {
      const errors = (await response.json()) as ServerErrors;
      return errors;
    }
  } catch (e) {
    console.error(e);
  }
};
type addCategoryParams = {
  name: string;
  photo?: string;
  token: string;
};
