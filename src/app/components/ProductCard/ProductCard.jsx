"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Button,
  Divider,
} from "@chakra-ui/react";

const ProductCard = ({ product, addToCart, isProductInCart }) => {
  return (
    <Card maxW="sm" pos="relative">
      <CardBody maxH="350px">
        <Image
          src={product.image}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
          h="50%"
          margin="0 auto"
        />
        <Stack mt="6" spacing="2">
          <Heading size="sm">{product.title}</Heading>
          <Heading size="xs" textTransform="capitalize">
            {product.category}
          </Heading>
          <Text color="blue.600" fontSize="2xl">
            ${product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          w="100%"
          variant="solid"
          colorScheme={isProductInCart ? "gray" : "blue"}
          onClick={() => addToCart(product)}
          cursor={isProductInCart ? "not-allowed" : "pointer"}
        >
          {isProductInCart ? "Already In Cart" : "Add To Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
