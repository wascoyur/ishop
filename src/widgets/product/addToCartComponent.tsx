import { useProductStore } from "../../app/state.ts";
import { Box, Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import Loader from "../loader/Loader.tsx";
import { useState } from "react";

export const AddToCartComponent = (props: { productId: string }) => {
  const [getProductById, addToBucket] = useProductStore((state) => [
    state.getProductById,
    state.addToBucket,
  ]);
  const [countProduct, setCountProduct] = useState<number>(1);
  const product = getProductById(props.productId);
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
                  alt={product.name}
                />
              </Box>
            </Text>
          </Flex>
          <Box>
            <Flex gap="2" justify="center" my="2">
              <Button
                radius="full"
                onClick={() => setCountProduct(countProduct + 1)}
              >
                +
              </Button>
              <TextField.Input
                onChange={(e) => {
                  setCountProduct(parseInt(e.target.value));
                }}
                type="number"
                placeholder="кол"
                value={countProduct}
                style={{ width: "3rem" }}
              />
              <Button
                radius="full"
                onClick={() => {
                  countProduct > 1 ? setCountProduct(countProduct - 1) : null;
                }}
              >
                -
              </Button>
            </Flex>
          </Box>
          <Flex gap="3" mt="4" justify="center">
            <Dialog.Close>
              <Button
                onClick={() =>
                  addToBucket({
                    productId: props.productId,
                    quantity: countProduct,
                  })
                }
              >
                В корзину
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button>Отменить</Button>
            </Dialog.Close>
          </Flex>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
