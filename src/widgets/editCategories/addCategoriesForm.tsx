import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import Loader from "../loader/Loader.tsx";
import { getCategories } from "../../shared/api/getCategories.ts";
import { addCategory } from "../../shared/api/addCategory.ts";
import { addCategoryParams } from "../../shared/api/apiTypes.ts";
import "../../shared/common-form.scss";

export const ButtonAddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = useProfileStore((state) => state.token);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
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
    setIsDialogOpen(false);

    setLoading(false);
  };
  const FormAddCategory = () => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Flex>
        <h2>Добавление категории</h2>
      </Flex>
      <Box className="default-style">
        <Form.Field name={"categoryName"} className="FormField">
          <Form.Label>Наименование категории</Form.Label>
          <Form.Control asChild>
            <input type="text" className="Input" />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"categoryPhoto"} className="FormField">
          <Form.Label>Фото категории</Form.Label>
          <Form.Control asChild>
            <input type="url" name="url" id="url" className="Input" />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild className="FormField">
          <Button>Сохранить</Button>
        </Form.Submit>
      </Box>
    </Form.Root>
  );
  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Trigger>
        <Button size="2" onClick={() => setIsDialogOpen(true)}>
          Добавить категорию
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormAddCategory />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
