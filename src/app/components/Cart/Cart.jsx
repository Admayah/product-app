import React from "react";
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import EmptyCart from "../EmptyCart/EmptyCart";

const CartDrawer = ({ cartItems, isOpen, onClose, updateCartItems }) => {
  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateCartItems(updatedCartItems);
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== itemToRemove
    );
    updateCartItems(updatedCartItems);
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          colorScheme="white"
          border="none"
          outline="none"
          _hover={{ background: "#3182CE", color: "#fff", borderColor: "blue" }}
          fontSize={20}
        />
        <DrawerHeader
          fontSize="24px"
          fontWeight="700"
          textTransform="uppercase"
          color="#3182CE"
        >{`carts items`}</DrawerHeader>
        <DrawerBody overflowY="auto" maxH="calc(100vh - 120px)">
          {cartItems.length === 0 ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              margin="auto 0"
              h="100%"
            >
              <EmptyCart onClose={onClose} />
            </Flex>
          ) : (
            cartItems.map((item, i) => (
              <Box
                key={i}
                display="flex"
                flexDirection="column"
                gap="6"
                padding="20px 0"
                borderTopWidth=".5px"
                borderColor="grap.100"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <HStack spacing="1.25rem">
                    <Image src={item.image} w="6rem" objectFit="cover" alt={item.title}/>
                    <Text w="150px">{item.title}</Text>
                  </HStack>
                  <Text as="span" fontSize="18" fontWeight="700">
                    ${item.price * item.quantity}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" alignItems="center">
                  <Button
                    bg="transparent"
                    _hover={{ background: "#3182CE", color: "#FFF" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon boxSize={6} />
                    <Text mx={2}> REMOVE</Text>
                  </Button>
                  <HStack spacing={2}>
                    <Button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                      bg={item.quantity === 1 ? "gray.100" : "#3182CE"}
                      color="#fff"
                    >
                      <MinusIcon />
                    </Button>
                    <Text as="span" fontSize="18" fontWeight="700">
                      {item.quantity}
                    </Text>
                    <Button
                      onClick={() => increaseQuantity(item.id)}
                      bg="#3182CE"
                      color="#fff"
                    >
                      <AddIcon />
                    </Button>
                  </HStack>
                </Flex>
              </Box>
            ))
          )}
        </DrawerBody>

        <DrawerFooter
          position="sticky"
          bottom={0}
          py={4}
          zIndex={2}
          borderColor="#E2E8FO"
          borderTopWidth={2}
        >
          <Stack spacing={8} w="full" mt={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text
                as="p"
                textTransform="capitalize"
                fontSize="20px"
                fontWeight="700"
              >
                total
              </Text>
              <Text as="p" fontSize="20px" fontWeight="700">
                ${calculateTotalPrice(cartItems).toFixed(2)}
              </Text>
            </Flex>
            <Button colorScheme="blue" h="3rem">
              {" "}
              Checkout
            </Button>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
