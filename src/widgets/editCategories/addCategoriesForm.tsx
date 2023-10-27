import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProductStore, useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import Loader from "../loader/Loader.tsx";
import { addCategory } from "../../shared/api/addCategory.ts";
import { addCategoryParams } from "../../shared/api/apiTypes.ts";
import "../../shared/scss/common-form.scss";
import { useFetchCategories } from "../../shared/api/getCategories.ts";

export const ButtonAddCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = useProfileStore((state) => state.token);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [categories, setCategories] = useProductStore((state) => [
    state.categories,
    state.setCategories,
  ]);
  const { loading: loadingCat, errors } = useFetchCategories();
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
    const result = await addCategory(newCategory);
    if ("id" in result) {
      setCategories([result]);
      setLoading(false);

      setIsDialogOpen(false);
    }
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
        <Dialog.Close>
          <Button onClick={() => setIsDialogOpen(false)}>Отменить</Button>
        </Dialog.Close>
      </Box>
    </Form.Root>
  );
  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Trigger>
        <Button size="4" onClick={() => setIsDialogOpen(true)}>
          Добавить категорию
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormAddCategory />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
