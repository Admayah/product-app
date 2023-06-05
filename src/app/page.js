"use client";
import { ChakraProvider } from "@chakra-ui/react";

import ProductContainer from "./components/ProductContainer/ProductContainer";

export default function Home() {
  return (
    <ChakraProvider>
      <main>
        <ProductContainer />
      </main>
    </ChakraProvider>
  );
}
