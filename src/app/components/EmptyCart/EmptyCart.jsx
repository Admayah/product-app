import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

const EmptyCart = ({ onClose }) => {
  return (
    <Box textAlign="center" p={4}>
      <Text fontSize="lg" mb={4}>
        Your cart is empty.
      </Text>
      <Button colorScheme="blue" onClick={onClose}>
        Continue Shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;
