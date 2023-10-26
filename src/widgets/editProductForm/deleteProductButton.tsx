import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import {
  useErrorStore,
  useProductStore,
  useProfileStore,
} from "../../app/state.ts";
import { useState } from "react";
import { deleteProduct } from "../../shared/api/useProductPut.ts";
import Loader from "../loader/Loader.tsx";
import { ServerErrors } from "../../entities/types.ts";

export const ButtonDeleteProduct = (props: { productId: string }) => {
  const [getProductById, categories] = useProductStore((state) => [
    state.getProductById,
    state.categories,
  ]);
  const token = useProfileStore((state) => state.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [setError] = useErrorStore((state) => [state.setError]);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await deleteProduct({
      token: token!,
      id: props.productId,
      method: "DELETE",
    });
    if ("errors" in result) {
      const resErrors = await result;
      console.log(resErrors);
      setError(resErrors.errors as ServerErrors);
      setIsDialogOpen(false);
    } /*if ("id" in result && result["id"] === String(props.categoryId))*/ else {
      /*removeCategoryById(result["id"]);*/
      setIsDialogOpen(false);
    }
    // console.log(await result);
  };
  const FormDeleteProduct = () => (
    <Box className="default-style">
      <Flex justify="center">
        <Box>Удалить {getProductById(props.productId)?.name || "Ошибка"}?</Box>
        <Box>
          <Button onClick={(e) => handleSubmit(e)}>Удалить</Button>
        </Box>
        <Dialog.Close>
          <Button onClick={() => setIsDialogOpen(false)}>Отменить</Button>
        </Dialog.Close>
      </Flex>
    </Box>
  );
  return (
    <Dialog.Root open={isDialogOpen}>
      <Dialog.Trigger>
        <Box my="2">
          <Button size="2" color="red" onClick={() => setIsDialogOpen(true)}>
            Удалить
          </Button>
        </Box>
      </Dialog.Trigger>
      <Dialog.Content>
        {loading ? <Loader /> : <FormDeleteProduct />}
      </Dialog.Content>
    </Dialog.Root>
  );
};
