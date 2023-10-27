import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import Loader from "../loader/Loader.tsx";
import { controlCategory } from "../../shared/api/controlCategory.ts";
import { addCategoryParams } from "../../shared/api/apiTypes.ts";
import "../../shared/scss/common-form.scss";

export const ButtonEditCategory = (props: { categoryId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const token = useProfileStore((state) => state.token);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleSubmit = async (
    e: HTMLFormElement | FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const updatedCategory: addCategoryParams = {
      name: data.get("categoryName") as string,
      photo: data.get("categoryPhoto") as string,
      token: token!,
    };
    setLoading(true);
    const { response, errors } = await controlCategory({
      ...updatedCategory,
      id: props.categoryId,
      method: "PUT",
    });
    if (errors) {
      setLoading(false);
    } else if (response) {
      setLoading(false);
    }

    setDialogOpen(false);
  };
  const FormEditCategory = () => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Box className="default-style">
        <Form.Field name={"categoryName"} className="FormField">
          <Form.Label>Наименование категории</Form.Label>
          <Form.Message match="valueMissing">
            Введите наименование категории
          </Form.Message>
          <Form.Control asChild>
            <input type="text" required className="Input" />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"categoryPhoto"} className="FormField">
          <Form.Label>Фото</Form.Label>
          <Form.Message match="valueMissing">
            Фставьте ссылку на фото категории
          </Form.Message>
          <Form.Control asChild>
            <input type="text" required className="Input" />
          </Form.Control>
        </Form.Field>
        <Flex justify="between">
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
        {loading ? <Loader /> : <FormEditCategory />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
