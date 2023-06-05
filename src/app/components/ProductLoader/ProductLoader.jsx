import React from "react";
import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";

const ProductLoader = () => {
  return (
    <SimpleGrid columns={3} spacing={4} mt={20}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
          <Skeleton height="200px" mb={4} />
          <Skeleton height="14px" mb={2} />
          <Skeleton height="14px" w="70%" />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ProductLoader;
