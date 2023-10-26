import { Box, Button, Dialog, Text } from "@radix-ui/themes";
import {
  useErrorStore,
  useProductStore,
  useProfileStore,
} from "../../app/state.ts";
import { controlCategory } from "../../shared/api/controlCategory.ts";
import { addCategoryParams } from "../../shared/api/apiTypes.ts";
import "../../shared/common-form.scss";
import { useState } from "react";
import { ServerErrors } from "../../entities/types.ts";

export const ButtonDeleteCategory = (props: { categoryId: string }) => {
  const token = useProfileStore((state) => state.token);
  const [getCategoryById, removeCategoryById] = useProductStore((state) => [
    state.getCategoryById,
    state.removeCategoryById,
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [setError, errors] = useErrorStore((state) => [
    state.setError,
    state.errors,
  ]);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedCategory: addCategoryParams = {
      name: "",
      photo: "",
      token: token!,
    };
    const result = await controlCategory({
      ...updatedCategory,
      id: props.categoryId,
      method: "DELETE",
    });
    if ("errors" in result) {
      const errors = (await result) as ServerErrors;
      setError(errors);
      setIsDialogOpen(false);
    } else if ("id" in result && result["id"] === String(props.categoryId)) {
      removeCategoryById(result["id"]);
      setIsDialogOpen(false);
    }
  };
  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Trigger>
        <Box>
          <Button size="2" color="red" onClick={() => setIsDialogOpen(true)}>
            Удалить
          </Button>
        </Box>
      </Dialog.Trigger>
      <Dialog.Content>
        <Box my="2">Удалить выбранную категорию?</Box>
        <Box>
          <Text>{getCategoryById(props.categoryId)?.name}</Text>
        </Box>
        <Box my="2">
          <Button size="1" onClick={() => setIsDialogOpen(false)}>
            Отменить
          </Button>
        </Box>
        <Dialog.Close>
          <Button size="1" onClick={(e) => handleSubmit(e)}>
            Подтвердить удаление
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
};
