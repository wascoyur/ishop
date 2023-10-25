import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useProductStore, useProfileStore } from "../../app/state.ts";
import { FormEvent, useState } from "react";
import { deleteProduct } from "../../shared/api/useProductPut.ts";
import Loader from "../loader/Loader.tsx";

export const ButtonDeleteProduct = (props: { productId: string }) => {
  const [getProductById, categories] = useProductStore((state) => [
    state.getProductById,
    state.categories,
  ]);
  const token = useProfileStore((state) => state.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await deleteProduct({
      token: token!,
      id: props.productId,
      method: "DELETE",
    });
    console.log(await result);
    setDialogOpen(false);
  };
  const FormDeleteProduct = () => (
    <Form.Root onSubmit={(e) => handleSubmit(e)}>
      <Box className="default-style">
        <Flex>
          <Box>
            Удалить {getProductById(props.productId)?.name || "Ошибка"}?
          </Box>
          <Box>
            <Form.Submit asChild>
              <Button>Удалить</Button>
            </Form.Submit>
          </Box>
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
        <Box my="2">
          <Button size="2" color="red" onClick={() => setDialogOpen(true)}>
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
