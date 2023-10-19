import { useProductStore } from "../../app/state.ts";
import { Badge, Box, Button, Dialog, Flex, Text } from "@radix-ui/themes";
import Loader from "../loader/Loader.tsx";

export const AddToCartComponent = (props: { productId: string }) => {
  const [getProductById, addToBucket] = useProductStore((state) => [
    state.getProductById,
    state.addToBucket,
  ]);
  console.log(props.productId);
  const product = getProductById(parseInt(props.productId));
  return (
    <div>
      {product ? (
        <>
          <Dialog.Title>Добавление товара в корзину</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Выберите количество товара для покупки.
          </Dialog.Description>
          <Flex direction="column" gap="3">
            <Text size="2" mb="1" weight="bold">
              Наименование продукта: {product.name}
            </Text>
            <Badge>{product.id}</Badge>
            <Badge>{props.productId}</Badge>

            <Text size="2" mb="1" weight="bold">
              <Box>
                <img
                  src={product.photo}
                  style={{
                    display: "block",
                    objectFit: "contain",
                    width: "100%",
                    height: 140,
                  }}
                />
              </Box>
            </Text>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Save</Button>
            </Dialog.Close>
          </Flex>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
